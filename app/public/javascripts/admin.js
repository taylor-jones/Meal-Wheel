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
    const $id = $btn.attr('id');
    const recordId = $id.replace('edit_', '').replace('-', '');

    $btn.siblings('.btn-save').toggleClass('d-none');
    $btn.toggleClass('d-none');
    $btn.parents('tr').children('td:nth-of-type(2)').children('input').focus();

    if ($id) {
      console.log('record exists');
    } else {
      console.log('new record');
    }

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
    const recordId = $id.replace('edit_', '').replace('-', '');
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

});
