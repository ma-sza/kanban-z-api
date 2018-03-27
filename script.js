$(function() {
  // State
  var columnCount = 0;


  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = ' ';
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str;
  }

  $('.create-column')
    .click(function() {
      var name = prompt('Enter a column name');
      var column = new Column(name);
      board.addColumn(column);
    });

  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      columnCount++;

      // Creating components
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      if (columnCount > 3) {
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        $columnDelete.click(function() {
          confirm("Are you sure?");
          self.removeColumn();
        })
      }

      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

      // Adding events

      $columnAddCard.click(function() {
        self.addCard(new Card(prompt('Enter name of the card')));
      })

      // Construction column elements
      $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);

      // Return of created column
      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {

      // Creating the blocks
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete').text('x');

      // Binding the clock event
      $cardDelete.click(function() {
        self.removeCard();
      });

      // Combining the blocks and return the card
      $card.append($cardDelete)
        .append($cardDescription);
      return $card;
    };
  };

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  };


  var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: '.card-placeholder'
    }).disableSelection();
  };

  // Creating columns
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

  // Adding columns to the board
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // CREATING CARDS
  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');

  // Adding cards to columns
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);




})
