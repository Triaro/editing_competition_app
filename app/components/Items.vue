<template>
    <Page>
        <ActionBar>
            <Label text="Home"></Label>
        </ActionBar>

  <StackLayout>
     
           
         <ListView :visibility="isItemVisible ? 'visible' : 'collapsed'" for="item in items" @itemTap="onItemTap">
            <v-template>
              <StackLayout orientation="horizontal" class="task-content">
                    <Label :text="item.name" textWrap="true"></Label>
                   
               </StackLayout>
        
            </v-template>
                   
        </ListView>
      <fab @tap="onFabTap" :visibility="isItemVisible ? 'visible' : 'collapsed'" icon="~/images/ic_add_white.png" class="fab-button"></fab> 

       <ScrollView :visibility="isTaskVisible ? 'visible' : 'collapsed'">
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

</StackLayout>      




    </Page>
</template>

<script>
  import ItemDetails from "./ItemDetails";
  import{Bus} from "~/app.js";
  import Items from "./Items"
  import * as imagepicker from "nativescript-imagepicker";
  import { ItemEventData } from "tns-core-modules/ui/list-view";
  import { Label } from "tns-core-modules/ui/label";
 
 export default {
    data() {
      

      return {
        taskId:'',
        taskDesc:'',
        isTaskVisible: false,
        isItemVisible: true,
        imageAssets: [],
        imageSrc: null,
        previewSize: 300,
        thumbSize: 80,
        thumbSize: null,
        items: [    ]      
        
      };
    },
    methods: {
      onSelectSingleTap: function(e) {
                this.isSingleMode = true;
                let context = imagepicker.create({ mode: "single" });
                this.startSelection(context);
            },
            onGenerateTap(){
              this.isTaskVisible=false;
              this.isItemVisible= true,

            this.items.push({
              name: this.taskId,
              src: this.imageSrc,
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
              this.isItemVisible= false;
             this.isTaskVisible= true;
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
