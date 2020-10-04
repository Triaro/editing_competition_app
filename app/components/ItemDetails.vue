<template>
    <Page>

        <ActionBar>
            <NavigationButton @tap="navigateBack" android.systemIcon="ic_menu_back"/>
            <Label :text="item.name" ></Label>
        </ActionBar>

        <StackLayout>
           <Image :src="item.src" :width="previewSize" :height="previewSize" stretch="aspectFit" verticalAlignment="top" class="imageCss"/>
           
            <TextView :text="item.description" editable="false" class="label"  />
            
        </StackLayout>
           
        
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
