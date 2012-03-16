ADAPTIVE PLUGIN README
======================

Information
-----------

### Description

Adaptive Modal is a jQuery plugin to display multiple modal windows.

### Author

Pierre Urban

### Version

0.0.1

### License

Free to use under the [MIT](http://www.opensource.org/licenses/mit-license.php) license, see LICENSE file.

Usage
-----

### JS

    $('a[data-adaptive-modal-id]').adaptiveModal();

### HTML

    <a href="#" data-adaptive-modal-id="myFirstModal">First modal</a>
    <a href="#" data-adaptive-modal-id="mySecondModal">Second modal</a>
    <div class="adaptive-modal" data-adaptive-modal-id="myFirstModal">Hello World! <a href="#" class="adaptive-modal-close">Close the modal</a></div>
    <div class="adaptive-modal" data-adaptive-modal-id="mySecondModal">Peace off! <a href="#" class="adaptive-modal-close">Close the modal</a></div>

### CSS

    .adaptive-modal {
      display: none;
    }
    #adaptive-modal-overlay {
      z-index: 42001;
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      background: #000;
      display: none;
    }
    #adaptive-modal-window {
      z-index: 42002;
      position: absolute;
      border: 1px solid #333;
      background-color: #fff;
      width: 750px;
      padding: 0 0 0 0;
      top: 150px;
      left: 50%;
      margin-left: -375px;
      display: none;
      -moz-box-shadow: 2px 2px 15px #000000;
      -webkit-box-shadow: 2px 2px 15px #000000;
      box-shadow: 2px 2px 15px #000000;
      filter: "progid: DXImageTransform.Microsoft.Shadow(strength = 2, direction = 135, color = '#000000')";
      -ms-filter: "progid: DXImageTransform.Microsoft.Shadow(strength = 2, Direction = 135, Color = '#000000')";
    }
    #adaptive-modal-content {
      margin: 10px;
      font-size: 16px;
      font-family: Arial;
    }

Options
-------

You can customize Adaptive Modal with some options:
* name: the prefix use which defines `name`-overlay (the overlay), `name`-window (the modal), `name`-content (the modal's content), `name`-close (class to bind a click event to close the modal)
* duration: the number of milliseconds before hiding the modal
* opacity: the overlay opacity

### Example

    $('a[data-my-specific-name-id]').adaptiveModal({
      name : 'my-specific-name',
      duration : 1000,
      opacity: 0.5
    });

