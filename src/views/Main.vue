<template>

    <div class="bg-[#1E1E1E] w-screen h-screen flex items-center justify-center relative">

        <dial :ringDiameter="600" :ringThickness="60" :arr="this.dataArray1" :id="'circle1'"></dial>
        <dial :ringDiameter="450" :ringThickness="60" :arr="this.dataArray2" :id="'circle2'"></dial>
        <dial :ringDiameter="300" :ringThickness="60" :arr="this.dataArray3" :id="'circle3'"></dial>

    </div>
 
</template>

<script>

import dial from '../components/dial.vue'

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
        dial
    },
    methods: { 

    },

    mounted(){

    }
}
</script>