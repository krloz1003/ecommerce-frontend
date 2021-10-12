<template>
<v-row dense>	
	<v-col cols="12">
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">
							Product
						</th>
						<th class="text-left">
							Price
						</th>
						<th class="text-left">
							Piece
						</th>
						<th class="text-left">
							Subtotal
						</th>
						<th class="text-left">
							Remove
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in rows" :key="row.id">
						<td>{{ row.name }}</td>
						<td>
							<div class="my-4 text-subtitle-1">
								{{ row.price | currency }}
							</div>
						</td>
						<td>						
							<v-btn small fab @click="$store.dispatch('increment', {id:row.id, rows: rows})">
								<v-icon>add</v-icon>
							</v-btn>
							<v-chip class="ma-2" large>
							{{ row.amount }}
							</v-chip>						
							<v-btn small fab @click="$store.dispatch('decrement', {id:row.id, rows: rows})">
								<v-icon>remove</v-icon>
							</v-btn>
						</td>
						<td>
							<div class="my-4 text-subtitle-1">
								{{ row.total | currency }}
							</div>				
						</td>
						<td>
							<v-btn icon color="red" @click="$store.dispatch('removeShoping', row)">
								<v-icon>close</v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>

		<v-card class="mx-auto"  outlined >
			<v-card-text style="height: 100px; position: relative">
				<v-list-item-title class="text-h5 mb-1">
					Payment Amount: {{ $store.getters.shopingTotal | currency }}
				</v-list-item-title>
				<v-card-actions right>
					<v-fab-transition>
						<v-btn x-large botton absolute right color="success" @click="formPay = !formPay">
							Proceed to pay
						</v-btn>
					</v-fab-transition>
				</v-card-actions>
			</v-card-text>
		</v-card>

		<v-dialog :value="formPay" max-width="90%" persistent>
			<v-form v-model="valid">
				<v-card>	  
					<v-card-title class="green darken-1 white--text font-weight-black title">
						ADDRESS
					</v-card-title>
					<v-card-text class='pb-8'>
						<v-row>
							<v-col cols='6'>
								<v-text-field label="Contact" v-model="form.contact" :rules="rules.contact" />
							</v-col>
							<v-col cols='6'>
								<v-text-field label="Phone number" v-model="form.phoneNumber" :rules="rules.phoneNumber" />
							</v-col>
							<v-col cols='12'>
								<v-text-field label="Address" v-model="form.address" :rules="rules.address" />
							</v-col>						
							<v-col col='5'>        
								<v-select :items="catContrys" label="Country" append-icon='keyboard_arrow_down' 
									v-model="form.country" :rules="rules.country"
								/>
							</v-col>
							<v-col col='5'>               
								<v-select :items="catStates" label="State" append-icon='keyboard_arrow_down' 
									v-model="form.state" :rules="rules.state"
								/>
							</v-col>
							<v-col col='2'>
								<v-text-field label="Zip code" v-model="form.zipCode" :rules="rules.zipCode" />
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
				<v-card>	  
					<v-card-title class="blue darken-1 white--text font-weight-black title">
						PAYMENT DETAILS
						<v-spacer></v-spacer>
						<v-img aspect-ratio="3.075" max-height="40" :src="urlImage" position="right" contain />
					</v-card-title>
					<v-card-text class='pb-10'>
						<v-row>
							<v-col cols='6'>
								<v-subheader class="grey--text text--lighten-1 pl-0 subheader">
									CARDHOLDER’S NAME
								</v-subheader>
								<v-text-field single-line outlined label="" hide-details v-model="form.namecard" :rules="rules.namecard"/>
							</v-col>
							<v-col cols='6'>
								<v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARD NUMBER</v-subheader>
								<v-text-field single-line outlined mask="credit-card" v-model="form.cardNumber" :rules="rules.cardNumber" hide-details />
							</v-col>
							<v-col col='4'>
								<v-subheader class="grey--text text--lighten-1 pl-0 subheader">EXPIRY DATE</v-subheader>           
								<v-select
									:items="catMonth" label="Month" outlined
									append-icon='keyboard_arrow_down' hide-details
									v-model="form.expiryDateMonth" :rules="rules.expiryDateMonth"
								/>
							</v-col>
							<v-col col='4'>
								<v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>                   
								<v-select
									:items="catYear" label="Year" outlined
									append-icon='keyboard_arrow_down' hide-details
									v-model="form.expiryDateYear" :rules="rules.expiryDateYear"
								/>
							</v-col>
							<v-col col='4'>
								<v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>             
								<v-text-field single-line outlined hide-details v-model="form.cvv" :rules="rules.cvv"/>  
							</v-col>
						</v-row>
					</v-card-text>

					<v-card-actions>
						<v-btn botton  color="red" @click="formPay = false" >
							Cancel
						</v-btn>
						<v-spacer></v-spacer>										
						<v-btn botton  color="success" @click="placeOrder()" >
							Place order
						</v-btn>
					</v-card-actions>							
				</v-card>		
			</v-form>
		</v-dialog>
		<v-dialog :value="succesPay" max-width="90%" persistent>
			<v-card-title class="green darken-1 white--text font-weight-black title">
				Thanks for your purchase
			</v-card-title>		
		</v-dialog>				
	</v-col>
</v-row>
</template>
<script>
const month 	= ["January", "February", "March", "April", "May", "June", "Jully", "August", "September", "October", "November", "December"];
const conuntrys = ['Mexico', 'United States'];
const states 	= 	['Aguascalientes',
					'Baja California',
					'Baja California Sur',
					'Campeche',
					'Coahuila de Zaragoza',
					'Colima',
					'Chiapas',
					'Chihuahua',
					'Ciudad de México',
					'Durango',
					'Guanajuato',
					'Guerrero',
					'Hidalgo',
					'Jalisco',
					'México',
					'Michoacán de Ocampo',
					'Morelos',
					'Nayarit',
					'Nuevo León',
					'Oaxaca',
					'Puebla',
					'Querétaro',
					'Quintana Roo',
					'San Luis Potosí',
					'Sinaloa',
					'Sonora',
					'Tabasco',
					'Tamaulipas',
					'Tlaxcala',
					'Veracruz',
					'Yucatán',
					'Zacatecas'];

import {mapState} from 'vuex'
export default {
	data: () => ({
		formPay: false,
		succesPay: false,
		valid: false,
		urlImage: 'https://i.imgur.com/lY1wk82.png',
		catYear: ['2030','2029','2028','2017','whatever'],
		catMonth: month,
		catContrys: conuntrys,
		catStates: states,		
		form: {
			contact: '',
			phoneNumber: '',
			address: '',
			country: '',
			state: '',
			zipCode: '',
			namecard: '',
			cardNumber: 'XXXX XXXX XXXX XXXX',
			expiryDateMonth: '',
			expiryDateYear: '',
			cvv: ''
		},
		rules: {
			contact: [	v => !!v || 'Name is required'],
			phoneNumber: [	v => !!v || 'Phone number is required'],
			address: [	v => !!v || 'Address is required'],
			country: [	v => !!v || 'Country is required'],
			state: [	v => !!v || 'State is required'],
			zipCode: [	v => !!v || 'Zip code is required'],
			namecard: [	v => !!v || 'Cardholder´s name is required'],
			cardNumber: [	v => !!v || 'Card number is required'],
			expiryDateMonth: [	v => !!v || 'Month is required'],
			expiryDateYear: [	v => !!v || 'Year is required'],
			cvv: [	v => !!v || 'CVV is required'],
		
		}		
	}),
	computed:{
		...mapState({
			rows: state => state.shoping 
		})
	},
	methods: {
		placeOrder(){
			this.formPay = false;
			this.succesPay = true;
			this.$store.dispatch('successShoping', []);
			setTimeout(() => (this.$router.push('/')), 2000)
		}
	}	
}
</script>


