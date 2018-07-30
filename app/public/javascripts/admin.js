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

  $(document).on('click', '.btn-edit', function() {
    editRecord(this, window.requestRoute);
  });

  $(document).on('click', '.btn-save', function() {
    saveRecord(this, window.requestRoute);
  });

  // $(document).on('focusout', 'tr', function() {
  //   setViewMode($(this), false);
  // });

  $(document).on('focusin', 'tr', function() {
    setViewMode($(this), true);
  });


  /**
   * FUNCTIONS
   */

  /**
   * adds a new row to the current admin table.
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
   * places the table row in a state of 'edit'
   */
  function editRecord(btn, route) {
    const $btn = $(btn);
    const $row = $btn.parents('tr');

    $btn.parents('tr').children('td:nth-of-type(2)').children('input').focus();
    setViewMode($row, true);
  }


  /**
   * takes the id of a 'remove' button and deletes the parent row from the DOM
   */
  function removeTableRow(removeButtonId) {
    $(`#${removeButtonId}`).parents('tr').remove();
  }

  /**
   * Uses the id associated with a button's id to
   * make a DELETE request on a specified route, attempting to delete
   *  a given record from the db and then remove it from it's admin table.
   */
  function deleteRecord(btn, route) {
    const $id = $(btn).attr('id');
    const recordId = $id.replace('delete_', '').replace('-', '');
    const req = new XMLHttpRequest();

    req.open('DELETE', `/${route}/${recordId}`, true);
    req.addEventListener('load', () => {
      if (req.status >= 200 && req.status < 400) {
        removeTableRow($id);
      } else {
        console.log(JSON.parse(req.responseText));
      }
    });

    req.send();
  }



  function saveRecord(btn, route) {
    const $id = $(btn).attr('id');
    const $row = $(btn).parents('tr');
    const recordId = $id.replace('save_', '').replace('-', '');

    const req = new XMLHttpRequest();
    const action = $id ? 'PUT' : 'POST';
    const params = {};

    $row.find('input', 'select').each(function() {
        const $el = $(this);
        params[$el.attr('name')] = $el.val() || $el.attr('value');
    });


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



  function updateIdsForRow(btn, id) {
    const $btn = $(btn);
    const $row = $btn.parents('tr');

    $row.children('td:nth-of-type(1)').attr('value', id);
    $row.find('.btn-edit').attr('id', `edit_${id}`);
    $row.find('.btn-delete').attr('id', `delete_${id}`);
    $row.find('.btn-save').attr('id', `save_${id}`);

    setViewMode($row, false);
  }



  function setViewMode($row, isEdit) {
    if (isEdit) {
      $row.find('.btn-save').removeClass('d-none');
      $row.find('.btn-edit').addClass('d-none');
    } else {
      $row.find('.btn-save').addClass('d-none');
      $row.find('.btn-edit').removeClass('d-none');
    }
  }

});
