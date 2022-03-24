<template>
  <div>
    
    <v-navigation-drawer v-model="drawer" app :temporary="true">
      <v-list>
        <v-list-item link :to="{name: 'index', query : {'class': 'Q15075508,Q44'}}">
          <v-list-item-action>
            <v-icon>mdi-water</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>List of Beer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{name: 'index', query : {'class': 'Q282'}}">
          <v-list-item-action>
            <v-icon>mdi-water</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>List of Wine</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{name: 'index', query : {'class': 'Q281'}}">
          <v-list-item-action>
            <v-icon>mdi-water</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>List of Whisky</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link :to="{name: 'map'}">
          <v-list-item-action>
            <v-icon>mdi-map</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Map</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Beyond Book Project</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text href="https://github.com/nakamura196/bbp">GitHub</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    drawer: false
  })
};
</script>