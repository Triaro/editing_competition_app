<template>
    <Page>
        <ActionBar>
            <Label text="Home"></Label>
        </ActionBar>

  <Label text="This is Label 1" top=""  right="" bottom="" left="" />
  <StackLayout>
      <grid-layout rows="auto, *">
           
         <ListView for="item in items" @itemTap="onItemTap">
            <v-template>
              <StackLayout orientation="horizontal" class="task-content">
                    <Label :text="item.name" textWrap="true"></Label>
                   
               </StackLayout>
        
            </v-template>
                   
        </ListView>
      <fab @tap="onFabTap"        
        icon="~/images/ic_add_white.png"
        class="fab-button"
      ></fab> 

     
      </grid-layout>


</StackLayout>      




       <ScrollView :visibility="isItemVisible ? 'visible' : 'collapsed'">
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
            <Button text="Generate Task" @tap="onGenerateTap" class="btn-outline"/>
            <Label text="" class="task-content"></Label>
            <Label text="" class="task-content"></Label>
            <Label text="" class="task-content"></Label>
            <Label text="" class="task-content"></Label>
          </StackLayout>
          
    </ScrollView>
    </Page>
</template>

<script>
  import ItemDetails from "./ItemDetails";
  import AssignTask from "./AssignTask";
  import{Bus} from "~/app.js";
  import Items from "./Items"
  import * as imagepicker from "nativescript-imagepicker";
  import { ItemEventData } from "tns-core-modules/ui/list-view";
  import { Label } from "tns-core-modules/ui/label";
 
 export default {
    components: {AssignTask
    },
    data() {
      

      return {
        taskId:'',
        taskDesc:'',
        isItemVisible: false,
        imageAssets: [],
        imageSrc: null,
        previewSize: 300,
        thumbSize: 80,
        thumbSize: null,
        items: [
          {name: "Task1",
           src: "",
           description:"This is Task 1"
          }
        ]  
    
        
      };
    },
    methods: {
      onSelectSingleTap: function(e) {
                this.isSingleMode = true;
                let context = imagepicker.create({ mode: "single" });
                this.startSelection(context);
            },
            onGenerateTap(){
              this.isItemVisible=false;
            this.items.push({
              name: this.taskId,
              src: this.image,
              description: this.taskDesc
            }
            )
        
           
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
           
      onFabTap(){
             this.isItemVisible= true;
             this.$navigateTo(Items);
             
       },
        onItemTap(args) {
        this.$navigateTo(ItemDetails, {
          frame: 'items',
          props: {item: args.item},
          animated: true,
          transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
          }
        });
      
     
      },
      
    },
    
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
