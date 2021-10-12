<template>
  <v-app>
    <v-app-bar
      app
      color="dark"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" to="/" >
              <v-icon>storefront</v-icon>
            </v-btn>                
          </template>
          <span>Shop</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" to="/shopping">
              <v-badge :content="$store.getters.shopingCount" color="black" >
                <v-icon>shopping_cart</v-icon>
              </v-badge> 
            </v-btn>                         
        </template>
          <span>Cart</span>
      </v-tooltip>       
      
      <v-tooltip bottom v-if="$store.state.role === 'admin'">
          <template v-slot:activator="{ on, attrs }" >
            <v-btn icon v-bind="attrs" v-on="on" :to="'/products'">
              <v-icon>shopping_bag</v-icon>
            </v-btn>                
          </template>
          <span>Products</span>
      </v-tooltip>            

      <v-tooltip bottom v-if="$store.state.role === 'admin'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" to="/users" >
              <v-icon>people</v-icon>
            </v-btn>                
          </template>
          <span>Users</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-tooltip bottom v-if="$store.state.role != 'admin'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" to="/login">
              <v-icon>login</v-icon>
            </v-btn>                
          </template>
          <span>Login</span>
      </v-tooltip>

      <v-tooltip bottom v-if="$store.state.role === 'admin'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click.prevent="logout()" >
              <v-icon>logout</v-icon>
            </v-btn>                
          </template>
          <span>Logout</span>
      </v-tooltip> 

    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AuthService from "./services/AuthService";

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    logout(){      
      AuthService.logout()
      .then((res) => {
        this.$store.dispatch('destroyToken', res);
        this.$router.push('/')
      });
    }
  }
};
</script>
