$(function() {
  // NOTE: in order for this to work, the delete button must have the matching class.

  /**
   * EVENT HANDLERS
   */

  // uses functions in admin.js
  $(document).on('click', '.btn-delete', function() {
    deleteRecord(this, window.requestRoute);
  });


  $(document).on('click', '.btn-add', function() {
    addTableRow();
  });


  $(document).on('click', 'td input, td select', function() {
    editRecord(this);
  });


  $(document).on('click', '.btn-edit', function() {
    editRecord(this);
  });


  $(document).on('click', '.btn-save', function() {
    saveRecord(this, window.requestRoute);
  });





  /**
   * FUNCTIONS
   */


  /**
   * @description adds a new row to the current admin table by copying
   *  the structure of the last existing row, removing all existing
   *  values from the new row, and then appending it to the end of the table.
   */
  function addTableRow() {
    const $lastRow = $('tr:last');
    const $newRow = $lastRow.clone();

    $newRow.find('input').attr('value', '').attr('id', '');
    $newRow.find('button').attr('id', '');
    $lastRow.after($newRow);

    editRecord($newRow.find('.btn-edit'), window.requestRoute);
  }


  /**
   * @description places the table row in a state of 'edit' and focuses the first
   *  non-hidden input field.
   * @param {element} DOM element: the element that was clicked.
   */
  function editRecord(element) {
    const $element = $(element);
    const $row = $element.parents('tr');

    $('tr').each(function(i) {
      setViewMode($(this), false);
    });

    if ($(element).is('input, select')) {
      $element.focus();
    } else {
      $element.parents('tr').children('td:nth-of-type(2)').children('input').focus();
    }

    setViewMode($row, true);
  }



  /**
   * @description takes the id of a 'remove' button and deletes
   *    the parent row from the DOM
   * @param {int} id: the [id] of a record to remove from the DOM.
   */
  function removeTableRow(removeButtonId) {
    $(`#${removeButtonId}`).parents('tr').remove();
  }



/**
 * @description determines the [id] of the row based on the 'delete' button that
 *  was clicked, and triggers a DELETE for that record. If successful, it also
 *  triggers removing the deleted record from the DOM.
 * @param {button} btn: the save button that was clicked.
 * @param {string} route: route where the http actions are called (e.g. /cuisines).
 */
  function deleteRecord(btn, route) {
    const $btnId = $(btn).attr('id');
    const recordId = $btnId.replace('delete_', '').replace('-', '');
    const req = new XMLHttpRequest();

    req.open('DELETE', `/${route}/${recordId}`, true);
    req.addEventListener('load', () => {
      if (req.status >= 200 && req.status < 400) {
        removeTableRow($btnId);
      } else {
        console.log(JSON.parse(req.responseText));
      }
    });

    req.send();
  }


/**
 * @description gathers the input values associated with the record and then calls
 *  either a POST (if it's a new record) or a PUT (if it's an existing record).
 * @param {button} btn: the save button that was clicked.
 * @param {string} route: route where the http actions are called (e.g. /cuisines).
 */
  function saveRecord(btn, route) {
    // cache dom elements
    const $btn = $(btn);
    const $btnId = $btn.attr('id');
    const recordId = $btnId.replace('save_', '').replace('-', '');
    const $row = $btn.parents('tr');

    // if it's a new record, the $btnId will be an empty string after removing 'save_'
    const action = $btnId ? 'PUT' : 'POST';
    const req = new XMLHttpRequest();

    /* setup the body params. loop through each [input] and [select]
        control in the row and get the associated values.
      * NOTE: for this to work properly, each row element that corresponds to
        a DB column should have a [name] attribute that matches the DB column name.
        For instance, <input name="cuisine_name">  etc... */
    const params = {};

    // get all the inouts from the row.
    $row.find('input').each(function() {
      const $el = $(this);
      params[$el.attr('name')] = $el.val() || $el.attr('value');
    });

    // get all the select values from the row.
    $row.find('select').each(function() {
      const $el = $(this);
      params[$el.attr('name')] = $el.attr('value');
    });

    // pass the determined action to the specified route.
    req.open(action, `/${route}/${recordId}`, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', () => {
      const res = JSON.parse(req.responseText);
      if (req.status >= 200 && req.status < 400) {
          updateIdsForRow(btn, res.insertId);
      } else {
        console.log('err', res);
      }
    });

    req.send(JSON.stringify(params));
  }


  /**
   * @description updates the id of a newly created or updated record by finding
   *  the row of the 'save' button that was clicked.
   * @param {button} btn - a button element that belongs to one of the table rows.
   * @param {int} id - the id of a newly created or updated record.
   */
  function updateIdsForRow(btn, id) {
    const $btn = $(btn);
    const $row = $btn.parents('tr');

    // NOTE: this function assumes that the row has the respective
    //  [id] field in the first <td> of the row.
    $row.children('td:nth-of-type(1)').attr('value', id);

    // identify the 'edit', 'delete', and 'save' buttons for the row,
    //  and update their [id] attributes to represent the argued [id].
    $row.find('.btn-edit').attr('id', `edit_${id}`);
    $row.find('.btn-delete').attr('id', `delete_${id}`);
    $row.find('.btn-save').attr('id', `save_${id}`);

    // update the row to be in a non-edit state.
    setViewMode($row, false);
  }


  /**
   * @description modifies the appearence of a row depending on if that row is being edited.
   * @param {jquery tr selector} $row - the row for which to set the view mode.
   * @param {boolean} isEdit - true if the row should be set to appear in an 'edit' state,
   *    false if not.
   */
  function setViewMode($row, isEdit) {
    // if it's being edited, hide the 'edit' button, and show the 'save' button.
    // if not, hide the 'save' button, and show the 'edit' button.
    if (isEdit) {
      $row.find('.btn-save').removeClass('d-none');
      $row.find('.btn-edit').addClass('d-none');
    } else {
      $row.find('.btn-save').addClass('d-none');
      $row.find('.btn-edit').removeClass('d-none');
    }
  }

});
