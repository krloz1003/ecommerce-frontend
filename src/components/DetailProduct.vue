<template>
	<v-row dense>
		<v-col :cols="12" >    
			<v-card :loading="loading" class="mx-auto my-12" max-width="374">
				<template slot="progress">
					<v-progress-linear
						color="deep-purple"
						height="10"
						indeterminate
					></v-progress-linear>
				</template>
				<v-img
					height="150"
					src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
				></v-img>
				<v-card-title>{{ product.name }}</v-card-title>
				<v-card-text>
					<v-row
						align="center"
						class="mx-0"
					>
					</v-row>
					<div class="my-4 text-subtitle-1">
						$ {{ product.price }}
					</div>
					<div>{{ product.description }}</div>
				</v-card-text>

				<v-divider class="mx-4"></v-divider>

				<v-card-actions>
					<v-btn color="success" @click="$store.dispatch('insertShoping', product)" >
						ADD TO CAR
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>
<script>
	import Productservice from "../services/ProductService";

	export default {
		name: 'product-detail',
		mounted() {			
			this.getDetail(this.$route.params.slug)
		},
		data: () => ({
			loading: false,
			selection: 1,
			product: []
		}),
		methods: {
			reserve () {
				this.loading = true
				setTimeout(() => (this.loading = false), 2000)
			},
			getDetail(slug){
				this.loading = true
				Productservice.get(slug)
				.then(res => {
					this.product = res.data;
					this.loading = false
				});
			},
		}
	}
</script>