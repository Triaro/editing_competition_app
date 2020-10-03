<template>
    <Page>
        <ActionBar>
            <Label text="Home"></Label>
        </ActionBar>

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
    </Page>
</template>

<script>
  import ItemDetails from "./ItemDetails";
  import AssignTask from "./AssignTask";
  import{Bus} from "~/app.js";

  export default {
    components: {AssignTask
    },
    data() {
      return {
        items: 
          {
            name: "Task1",
            description: "This is Task1"
          }
    
        
      };
    },
    methods: {
       onFabTap(){
        this.$navigateTo(AssignTask, {
          frame: 'items',          
          animated: true,
          transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
          }
          });
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
      
     
      }
    },
    created(){
          Bus.$on('taskAdded', (value)=>{
            this.items.name=value;
          });
        
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
