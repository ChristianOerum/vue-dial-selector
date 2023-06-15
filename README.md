# Vue dial selecter

A mouse/touch spinning dial selecter component compatible with most modern browsers.

Live demo avalible at [this link](https://liveview-b19e3.firebaseapp.com/).

Can be imported as a regular vue component:
```
<template>
    <dial :ringDiameter="600" :ringThickness="60" :arr="this.dataArray1" :id="'circle1'"></dial>
</template>

<script>
import dial from '../components/dial.vue'

export default {
    data() {},
    setup() {},
    components: {
        dial
    },
    methods: { }
}
</script>
```
The component takes in the following props for sesizing and configuring:
```
:ringDiameter = 300   //Number of px
:ringThickness = 50   //Number of px
:arr = ["item1",item2]   //Array of selections
:id = 1   //Number of the Unique dial
```


## Yet to be implemented
* Return of selection id once selected.
* Color config props.



## Usage

The vue component has to be pasted manually into your project component folder, then you can manually import the component as you wish throughout your entire project.

### You can then use the standard vue commands to preview and build
#### Dev and preview
```
npm run serve
```

#### Compile for production
```
npm run build
