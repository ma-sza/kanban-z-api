var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3064',
  'X-Auth-Token': '72325b924c4b53d12a381b5eb90b52da'
};

$.ajaxSetup({
  headers: myHeaders
});

$.ajax({
  url: baseUrl + '/board',
  method: 'GET',
  success: function(response) {
    setupColumns(response.columns);
  }
});

function setupColumns(columns) {
  columns.forEach(function(column) {
    var col = new Column(column.id, column.name);
    board.createColumn(col);
  });
}

function setupCards(col, cards) {
  cards.forEach(function(card) {
    var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    col.createCard(cardObj);
  })
}
