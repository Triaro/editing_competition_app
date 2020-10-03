<template lang="html">
    <BottomNavigation>
        <TabStrip>
            <TabStripItem class="navigation__item">
                <Label text="Home"></Label>
                <Image src.decode="font://&#xf015;" class="fas t-36"></Image>
            </TabStripItem>
            
            <TabStripItem class="navigation__item">
                <Label text="Settings"></Label>
                <Image src.decode="font://&#xf013;" class="fas t-36"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem>
            <Frame id="items">
                <Items/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="settings">
                <Settings/>
            </Frame>
        </TabContentItem>

    </BottomNavigation>
</template>

<script>
  import Items from "./Items.vue";
  import Settings from "./Settings.vue";

  export default {
    components: {
      Items,
      Settings
    }
  };
</script>

<style lang="scss">
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
