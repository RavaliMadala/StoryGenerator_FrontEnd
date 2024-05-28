<template>
    <div>
        <v-list>
            <v-list-group no-action v-for='story in storys' :key="story.id">
                <template v-slot:activator="{ props }">
                    <v-list-item slot='activator' v-bind="props">
                        <v-list-item-title>{{ story.title }}</v-list-item-title>
                    </v-list-item>
                </template>

                <v-list-item
                    v-for="ver in story.versionControl"
                    :key="ver.version"
                    :title="ver.version"
                    :value="ver.version"
                    prepend-icon="mdi-arrow-right"
                >
                    <v-list-item-title>{{ ver.response }}</v-list-item-title>
                    <template v-slot:append>
                    <v-btn size="small" variant="tonal">
                        <v-icon color="#711429" > mdi-book-open  </v-icon>&nbsp;
                        Open
                    </v-btn>
                    &nbsp;
                    </template>
                </v-list-item>
            </v-list-group>
        </v-list>
    </div>
</template>
  
  <script>

    export default {
      data: () => ({
        storys: [
                {
                    title: "A Ghost in a pen",
                    id: "2002",
                    versionControl: [
                        { version: "V1", response: "Blah blah Blah blahBlah blahBlah blahBlah blahBlah blah" },
                        { version: "V2", response: "Blah blahBlah blahBlah blahBlah blah" },
                        { version: "V3", response: "Blah blahBlah blahBlah blahBlah blah" },
                        { version: "V4", response: "Blah blahBlah blahBlah blahBlah blah" },
                    ]
                },
                {
                    title: "Person of poll",
                    id: "2003",
                    versionControl: [
                        { version: "V1", response: "Blah blahBlah blah" },
                        { version: "V2", response: "Blah blahBlah blahBlah blahBlah blahBlah blah" },
                    ]
                },
            ]
      }),
    }
  </script>