<template>

    <div class="bg-white w-screen h-screen flex items-center justify-center relative">

        <div id="circle" :style="{ transform: `rotate(${rotation}deg)` }" @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag" @touchstart="startTouchDrag" @touchmove="dragTouch" @touchend="endTouchDrag" class="w-[700px] h-[700px] inset-0 rounded-full bg-transparent border-[60px] border-[#0097ff] flex items-center justify-center">
            <canvas id="ring-text" width="700" height="700"></canvas>
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
            ring1_items: ["Appelsin","Bananer","Jordbær","Kirsebær","Kiwi"],
            ring1_items_val: []
        }
    },
    setup() {

    },
    components: {},
    methods: {

        //pc drag stuff
        startDrag(event) {
        this.isDragging = true;
        const circle = document.getElementById('circle');
        const circleRect = circle.getBoundingClientRect();
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;
        this.prevAngle = Math.atan2(event.clientY - circleCenterY, event.clientX - circleCenterX);
        event.preventDefault();
        },

        drag(event) {
        if (this.isDragging) {
            const circle = document.getElementById('circle');
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
        const circle = document.getElementById('circle');
        const circleRect = circle.getBoundingClientRect();
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;
        this.prevAngle = Math.atan2(event.touches[0].clientY - circleCenterY, event.touches[0].clientX - circleCenterX);
        event.preventDefault();
        },

        dragTouch(event) {
        if (this.isDragging) {
            const circle = document.getElementById('circle');
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
        const circle = document.getElementById('circle');
        circle.style.transition = 'transform 0.7s ease';
        
        let segments = 360/this.ring1_items_val.length
        let temp = (Math.floor(this.rotation/segments)) + 1

        let pos = (temp*(segments)) - (segments/2)

        this.rotation = pos

        setTimeout(() => {
            circle.style.transition = '';
        }, 700);
        },

        
    },

    mounted(){

        this.ring1_items.forEach((element, index) => {

            let cellDegrees = 360/this.ring1_items.length
            
            let minAng = cellDegrees*index
            let selectAng = (cellDegrees*index)+(cellDegrees/2) 

            this.ring1_items_val.push({name: element, min: minAng, select: selectAng})
        });

        //curved text creator
        const canvas = document.getElementById("ring-text");
        const context = canvas.getContext("2d");

        const radius = 320;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const startAngle = -Math.PI / 2;

        const strings = this.ring1_items_val

        const fontSize = 18;
        const cellPadding = 3; // Adjust the cell padding as needed
        const anglePerString = (2 * Math.PI) / strings.length;

        context.fillStyle = "white";
        context.font = `${fontSize}px 'axiforma-bold', sans-serif`;
        context.textBaseline = "middle";
        context.textAlign = "center";

        for (let i = 0; i < strings.length; i++) {
        const string = strings[i].name;
        const stringWidth = context.measureText(string).width;
        const cellWidth = stringWidth + 2 * cellPadding;
        const cellAngle = cellWidth / radius;
        const stringAngle = startAngle + i * anglePerString;
        const offsetAngle = (anglePerString - cellAngle) / 2;

        const fixedCharWidth = 1.2; // Adjust the fixed character width as needed
        const charCount = string.length;
        const totalCharWidth = charCount * fixedCharWidth;
        const charAngle = (totalCharWidth + cellPadding) / radius;

        let charOffset = 0;
        for (let j = 0; j < string.length; j++) {
            const char = string[j];
            const angle = stringAngle + offsetAngle + charOffset;

            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            context.save();
            context.translate(x, y);
            context.rotate(angle + Math.PI / 2);
            context.fillText(char, 0, 0);
            context.restore();

            charOffset += charAngle;
        }
        }



    }
}
</script>