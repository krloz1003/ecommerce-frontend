<template>
	<v-row dense>
		<v-col v-for="row in rows" :key="row.id" :cols="3" >    
			<v-card class="mx-auto my-12" max-width="374">
				<template slot="progress">
					<v-progress-linear
						color="deep-purple"
						height="10"
						indeterminate
					></v-progress-linear>
				</template>
				<v-img
					height="150"
					:src="getUrl(row.media)"
				></v-img>
				<v-card-title>{{ row.name }}</v-card-title>
				<v-card-text>
					<v-row
						align="center"
						class="mx-0"
					>
					</v-row>
					<div class="my-4 text-subtitle-1">
						{{ row.price | currency  }}
					</div>
					<div>{{ row.description }}</div>
				</v-card-text>

				<v-divider class="mx-4"></v-divider>

				<v-card-actions>
					<v-btn color="success" @click="$store.dispatch('insertShoping', row)" >
						ADD TO CAR
					</v-btn>
					<v-btn color="success" :to="'/product/'+row.slug" >
						Info
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>	
</template>
<script>
	import ProductService from "../services/ProductService";

	export default {
		name: 'products-list',
		mounted() {			
			this.getData();
		},
		data: () => ({
			loading: false,
			selection: 1,
			rows: []
		}),
		methods: {
			reserve () {
				this.loading = true
				setTimeout(() => (this.loading = false), 2000)
			},
			getUrl(row){
				return (row.length > 0)? row[0]['original_url'] : 'https://cdn.vuetifyjs.com/images/cards/cooking.png';
			},
			getData(){
				ProductService.getAll()
				.then(res => {
					this.rows = res.data;
				});
			},
		}
	}
</script>