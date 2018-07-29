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
  const recordId = $id.replace('delete_', '');

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
