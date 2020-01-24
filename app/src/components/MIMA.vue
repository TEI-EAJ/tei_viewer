<template>
  <v-card class="ma-2">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>関連コンテンツ</v-toolbar-title>
    </v-toolbar>
    <v-list subheader>
      <v-subheader>powered by MIMAサーチ</v-subheader>

      <v-list-item v-for="(item, key) in ['aaa', 'bbb']" :key="key">
        <v-list-item-content>
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>