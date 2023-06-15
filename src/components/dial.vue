<template>
    
    <div :id="this.id" :style="{ transform: `translate(-50%, -50%) rotate(${rotation}deg)`, width: this.ringDiameter + 'px', height: this.ringDiameter + 'px', borderWidth: this.ringThickness + 'px', top: '50%', left: '50%', clipPath: 'circle(50% at center)' }" @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag" @touchstart="startTouchDrag" @touchmove="dragTouch" @touchend="endTouchDrag" class="absolute inset-0 rounded-full bg-transparent border-[#2A2A2A] flex items-center justify-center">
        
        <div>
            <svg :id="'svgContainer' + this.id" :height="this.ringDiameter" :width="this.ringDiameter"></svg>
        </div>

    </div>

  </template>
  
  <script>
  export default {
    data() { 
        return {
            isDragging: false,
            prevAngle: 0,
            rotation: 0,
            ring1_items: this.arr,
            ring1_items_val: [],
            items: []
        }
    },
    mounted() {
        
        console.log("test")
        console.log(this.ringDiameter)
        console.log(this.ringThickness)

        this.ring1_items.forEach((element, index) => {

            let cellDegrees = 360/this.ring1_items.length
            
            let minAng = cellDegrees*index
            let maxAng = cellDegrees*(index+1)
            let selectAng = (cellDegrees*index)+(cellDegrees/2) 

            this.ring1_items_val.push({name: element, min: minAng, max: maxAng, select: selectAng})

        });

        this.addPaths();

    },
    props: {
        ringDiameter: {
            type: Number,
            required: true
        },
        ringThickness: {
            type: Number,
            required: true
        },
        arr: {
            type: Array,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    methods: {

        //pc drag stuff
        startDrag(event) {
        this.isDragging = true;
        const circle = document.getElementById(this.id);
        const circleRect = circle.getBoundingClientRect();
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;
        this.prevAngle = Math.atan2(event.clientY - circleCenterY, event.clientX - circleCenterX);
        event.preventDefault();
        },

        drag(event) {
        if (this.isDragging) {
            const circle = document.getElementById(this.id);
            const circleRect = circle.getBoundingClientRect();
            const circleCenterX = circleRect.left + circleRect.width / 2;
            const circleCenterY = circleRect.top + circleRect.height / 2;
            const currentAngle = Math.atan2(event.clientY - circleCenterY, event.clientX - circleCenterX);
            let angleDiff = currentAngle - this.prevAngle;
            if (angleDiff < -Math.PI) {
            angleDiff += 2 * Math.PI;
            } else if (angleDiff > Math.PI) {
            angleDiff -= 2 * Math.PI;
            }
            this.rotation += angleDiff * (180 / Math.PI);
            this.prevAngle = currentAngle;
        }
        },

        endDrag() {
        this.isDragging = false;
        this.transitionToInitialPosition();
        },
        

        //touch drag stuff
        startTouchDrag(event) {
        this.isDragging = true;
        const circle = document.getElementById(this.id);
        const circleRect = circle.getBoundingClientRect();
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;
        this.prevAngle = Math.atan2(event.touches[0].clientY - circleCenterY, event.touches[0].clientX - circleCenterX);
        event.preventDefault();
        },

        dragTouch(event) {
        if (this.isDragging) {
            const circle = document.getElementById(this.id);
            const circleRect = circle.getBoundingClientRect();
            const circleCenterX = circleRect.left + circleRect.width / 2;
            const circleCenterY = circleRect.top + circleRect.height / 2;
            const currentAngle = Math.atan2(event.touches[0].clientY - circleCenterY, event.touches[0].clientX - circleCenterX);
            let angleDiff = currentAngle - this.prevAngle;
            if (angleDiff < -Math.PI) {
            angleDiff += 2 * Math.PI;
            } else if (angleDiff > Math.PI) {
            angleDiff -= 2 * Math.PI;
            }
            this.rotation += angleDiff * (180 / Math.PI);
            this.prevAngle = currentAngle;

        }
        },

        endTouchDrag() {
        this.isDragging = false;
        this.transitionToInitialPosition();
        },

        transitionToInitialPosition() {
        const circle = document.getElementById(this.id);
        circle.style.transition = 'transform 0.7s ease';
        
        let segments = 360/this.ring1_items_val.length
        let temp = (Math.floor(this.rotation/segments)) + 1

        let pos = (temp*(segments)) - (segments/2)

        this.rotation = pos
        this.test = 0

        setTimeout(() => {
            circle.style.transition = '';
            //window.navigator.vibrate(20)
        }, 700);
        },
        
        createArc(centerX, centerY, radius, startAngle, endAngle) {
            let path

            if (endAngle != 360) { 
                const startRadians = (startAngle - 90) * (Math.PI / 180);
                const endRadians = (endAngle - 90) * (Math.PI / 180);
                const startX = centerX + radius * Math.cos(startRadians);
                const startY = centerY + radius * Math.sin(startRadians);
                const endX = centerX + radius * Math.cos(endRadians);
                const endY = centerY + radius * Math.sin(endRadians);

                const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

                path = `M${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}`;
            }

            else {
                endAngle = 359.99

                const startRadians = (startAngle - 90) * (Math.PI / 180);
                const endRadians = (endAngle - 90) * (Math.PI / 180);
                const startX = centerX + radius * Math.cos(startRadians);
                const startY = centerY + radius * Math.sin(startRadians);
                const endX = centerX + radius * Math.cos(endRadians);
                const endY = centerY + radius * Math.sin(endRadians);

                const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

                path = `M${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}`;
            }

            return path;

        },

        addPaths() {

        const dynID = 'svgContainer' + this.id
        const svg = document.getElementById(dynID)
        
        this.ring1_items_val.forEach((data, index) => {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', this.createArc(this.ringDiameter/2, this.ringDiameter/2, (this.ringDiameter/2)-(this.ringThickness/2)-5, data.min, data.max));
          path.setAttribute('fill', 'transparent');
          path.setAttribute('id', "curve(" + this.id + ')item_' + index);
          svg.appendChild(path);
  
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
          textPath.setAttribute('text-anchor', 'middle');
          textPath.setAttribute('startOffset', '50%')
          textPath.setAttribute('href', '#curve(' + this.id + ')item_' + index);
          textPath.setAttribute('fill', 'white');
          textPath.textContent = data.name;
          text.appendChild(textPath);
          svg.appendChild(text);
        });

      }

    }
  };
  </script>
  