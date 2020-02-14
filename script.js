const App = {
  init: function () {
    this.canvas.init("art");
    this.controls.init(this.canvas);
  },
  
  canvas: {
    element: null, // will be set later
    init: function (canvas_id) {
      // creates wrapper
      this.element = new fabric.Canvas(canvas_id);

      // background
      // this.element.setBackgroundColor(
      //   "#fafafa",
      //   this.element.renderAll.bind(App.canvas.element)
      // );     

      // markers
      this.markers.init();
      this.element.add(this.markers.X);
      this.element.add(this.markers.Y);
      
      // this.refresh();
    },
    
    actives: function () {
      return this.element.getActiveObjects();
    },
    
    refresh: function () {
      this.element.renderAll();
    },
    
    add: function (text, options) {

      let { top, left } = this.markers.getCoords();
      console.log('left: ' + left);
      
      let lastLeft = 0;
      let lastWidth = 0;

      text.split("").forEach((char, i) => {
        let letter = new fabric.Text(char);
        
        letter.set("fontFamily", options.fontFamily);
        letter.set("top", top);
        
        let width = options.fontSize;

        if (i > 0) {
          left = lastLeft + lastWidth;
        }
        
        lastWidth = letter.width;
        lastLeft = left;
        letter.set("left", left);

        this.element.add(letter);
      })
      
    },
    removeActive: () => {
      var elements = App.canvas.actives();

      if (elements) {
        elements.map(el => App.canvas.element.remove(el));
      }
    },
    markers: {
      init: function ()  {
        
        [this.X, this.Y].forEach(marker => {
          marker.on('mouseover', () => {
            marker.set('selectable', true);
          });
          
          marker.on('mouseout', () => {
            marker.set('selectable', false);
          });
          
        })
      },
      getCoords: function () {
        /*let left = this.X.get('left');
        let top = this.Y.get('top');
        return { left, top };*/
        if(this.X.get('visible')) {
          return {
            left: this.X.get("left") + 10,
            top: this.Y.get("top") + 6
          }
        } else {
          return {
            left: 0,
            top: 0
          }
        }
        
      },
      X: new fabric.Group(
        [
          new fabric.Circle({
            radius: 10,
            fill: 'red',
            left: -10,
            top: -10,
            hasBorders: false,
            hasControls: false,
          }),
          new fabric.Line([0, 1000, 0, 0], {
            fill: 'red',
            stroke: 'red',
            strokeWidth: 1
          })
        ], 
        {
          top: -10,
          left: -10,
          lockMovementY: true,
          hasBorders: false,
          hasControls: false,
          visible: false,
          selectable: false
      }),
      Y: new fabric.Group(
        [
          new fabric.Circle({
            radius: 10,
            fill: 'blue',
            left: -10,
            top: -10,
            hasBorders: false,
            hasControls: false,
          }),
          new fabric.Line([0, 0, 1000, 0], {
            fill: 'blue',
            stroke: 'blue',
            strokeWidth: 1
          })
        ], 
        {
          top: -10,
          left: -10,
          lockMovementX: true,
          hasBorders: false,
          hasControls: false,
          visible: false,
          selectable: false
      }),
      toggle: () => {
        App.canvas.markers.X.set({
          visible: !App.canvas.markers.X.get('visible')
        });

        App.canvas.markers.Y.set({
          visible: !App.canvas.markers.Y.get('visible')
        });

        App.canvas.refresh();
      }
    },
  },

  controls: {
    text: document.getElementById("input-text"),
    add: document.getElementById("add"),
    eraser: document.getElementById("eraser"),
  
 
    init: function (canvas) {
      // add text
      this.text.value = "WELCOME";
      console.log(this);
      
      this.add.addEventListener("click", () => {
        let text = this.text.value;
        
        if (text) {  
          canvas.add(text, {
            fontFamily: "Impact",
          });
          
        }
      });

      // remove text
      this.eraser.addEventListener("click", () => {
        canvas.removeActive();
      });  
    }
  },
};

App.init();