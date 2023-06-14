<template>

    <div class="bg-[#1E1E1E] w-screen h-screen flex items-center justify-center relative">

        <!-- dial :ringDiameter="600" :ringThickness="60" :arr="this.dataArray1" :id="'circle1'"></dial -->
        <!-- dial :ringDiameter="450" :ringThickness="60" :arr="this.dataArray2" :id="'circle2'"></dial -->
        <!-- dial :ringDiameter="300" :ringThickness="60" :arr="this.dataArray3" :id="'circle3'"></dial -->

        <svg class="w-[500px] h-[500px]" viewBox="0 0 500 500">
            <path id="curve" fill="transparent" :d="createArc(250, 250, 200, 0, 360)" />
            <text text-anchor="middle">
                <textPath xlink:href="#curve" fill="white">
                    DangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangererDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDangerDanger
                </textPath>
            </text>
        </svg>

    </div>
 
</template>

<script>

//import dial from '../components/dial.vue'

export default {
    data() { 
        return {
            dataArray1: ["Appelsin","Bananer","Jordbær","Kirsebær","Kiwi"],
            dataArray2: ["Kerner","Frø","Saft","Sten","Andet"],
            dataArray3: ["Molekyler","Celler","Atomer"]
        }
    },
    setup() {

    },
    components: {
        //dial
    },
    methods: {  

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

        console.log(path)
        return path;

        }

    },

    mounted(){
    }
}
</script>