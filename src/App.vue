<template>
	<v-app>
		<v-app-bar app color="dark" dark >
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

			<v-bottom-navigation>
				<v-btn to="/">
					<span>Shop</span>
					<v-icon>storefront</v-icon>
				</v-btn>
				<v-btn to="/shopping">
					<v-badge :content="$store.getters.shopingCount" color="black" >
						<span>Cart</span>
					</v-badge> 
					<v-icon>shopping_cart</v-icon>
				</v-btn>
				<v-btn :to="'/products'" v-if="$store.state.token">
					<span>Products</span>
					<v-icon>shopping_bag</v-icon>
				</v-btn>
				<v-btn to="/users" v-if="$store.state.token">
					<span>Users</span>
					<v-icon>people</v-icon>
				</v-btn>
			</v-bottom-navigation>

			<v-spacer></v-spacer>

			<v-tooltip bottom v-if="$store.state.token === ''">
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on" to="/login">
						<v-icon>login</v-icon>
					</v-btn>                
				</template>
				<span>Login</span>
			</v-tooltip>

			<v-tooltip bottom v-if="$store.state.token != ''">
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
			this.$store.dispatch('destroyToken');
			AuthService.logout()
			.then(() => {        
				this.$router.push('/')
			})
			.catch((res) => {				
				this.errors = (res.response != undefined)? res.response.data : [];
				
			});
		}
	}
};
</script>
