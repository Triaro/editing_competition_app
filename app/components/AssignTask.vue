<template lang="html">
    <Page>
        <ActionBar>
           <NavigationButton @tap="navigateBack" android.systemIcon="ic_menu_back"/>
            <Label text="Assign Task"></Label>
        </ActionBar>
    <ScrollView>
          <StackLayout class="stack">
              <Label text="Let's Assign a task" class="task-head"></Label>
                <FlexboxLayout>
                  <Label text="Task ID-" class="task-content"></Label>
                  <TextField v-model="taskId" hint="Enter Task ID" class="form-input" />          
                </FlexboxLayout> 

            <Label text="Upload the image for the task-" class="task-content"></Label>
         
            <Image :src="imageSrc" :visibility="isSingleMode?'visible':'collapsed'" :width="previewSize" :height="previewSize" stretch="aspectFit" class="imageCss"/>
            <Button text="Upload Image" @tap="onSelectSingleTap" class="btn-outline" />
            
       
              <Label text="Add some description of the task-" class="task-content"></Label>
            <TextView v-model="taskDesc" style="margin-top: 15px" class="textArea" 

            borderWidth="1" height="200" hint="Enter Description" 
              returnKeyType="send" />
            <Button text="Generate Task" @tap="onButtonTap" class="btn-outline"/>
            <Label text="" class="task-content"></Label>
            <Label text="" class="task-content"></Label>
            <Label text="" class="task-content"></Label>
            <Label text="" class="task-content"></Label>
          </StackLayout>
          
    </ScrollView>
    </Page>
</template>

<script>
import { Observable } from 'tns-core-modules/data/observable';
 import{Bus} from "@/app.js";
 import Items from "./Items"
    import * as imagepicker from "nativescript-imagepicker";
    import { ItemEventData } from "tns-core-modules/ui/list-view";
    import { Label } from "tns-core-modules/ui/label";
    export default {
        data() {
            return {
                isSingleMode: false,
                imageAssets: [],
                imageSrc: null,
                previewSize: 300,
                thumbSize: 80,
                thumbSize: null
            }
        },
  
        methods: {
            onSelectSingleTap: function(e) {
                this.isSingleMode = true;
                let context = imagepicker.create({ mode: "single" });
                this.startSelection(context);
            },
            onButtonTap(){
             Bus.$emit('taskAdded',this.taskId); 
              this.$navigateTo(Items, {
                  frame: 'items',
                  animated: true,
                  transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                  }
              })
        
           
            },
           
            startSelection(context) {
                context
                    .authorize()
                    .then(() => {
                        this.imageAssets = [];
                        this.imageSrc = null;
                        return context.present();
                    })
                    .then((selection) => {
                        console.log("Selection done: " + JSON.stringify(selection));
                        this.imageSrc = this.isSingleMode && selection.length > 0 ? selection[0] : null;
                        // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                        selection.forEach(element => {
                            element.options.width = this.isSingleMode ? this.previewSize : this.thumbSize;
                            element.options.height = this.isSingleMode ? this.previewSize : this.thumbSize;
                        });
                        this.imageAssets = selection;
                    }).catch(function (e) {
                        console.log(e);
                    });
            },
           
        
     navigateBack(){
     this.$navigateBack();   
     }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
