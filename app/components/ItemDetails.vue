<template>
    <Page>

        <ActionBar>
            <NavigationButton @tap="navigateBack" android.systemIcon="ic_menu_back"/>
            <Label :text="item.name"></Label>
        </ActionBar>

        <GridLayout>
            <Image :src="item.imageSrc" :width="previewSize" :height="previewSize" stretch="aspectFit" class="imageCss"/>
            <Label class="m-10 h3" :text="item.description" verticalAlignment="top"></Label>
        </GridLayout>
    </Page>
</template>

<script>
  export default {
    props: ["item"],
      data() {
      

      return {      
        imageAssets: [],       
        previewSize: 300,
        thumbSize: 80,
        thumbSize: null,
      }
      },
     methods: {
       navigateBack(){
       this.$navigateBack();   
       }

   }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
