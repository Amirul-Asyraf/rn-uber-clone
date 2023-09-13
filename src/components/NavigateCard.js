import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "@rneui/themed";

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const mapRef = useRef(null);
	const destination = useSelector(selectDestination);

	useEffect(() => {
		if (!destination) return;
		mapRef.current?.setAddressText(destination.description);
	}, [destination]);

	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<Text style={tw`text-center py-5 text-xl`}>Good Morning, Miles</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<View>
					<GooglePlacesAutocomplete
						ref={mapRef}
						placeholder="Where to?"
						styles={toInputBoxStyles}
						fetchDetails={true}
						minLength={2}
						onPress={(data, details = null) => {
							dispatch(
								setDestination({
									location: details.geometry.location,
									description: data.description,
								})
							);

							navigation.navigate("RideOptionsCard");
						}}
						enablePoweredByContainer={false}
						query={{
							key: GOOGLE_MAPS_KEY,
							language: "en",
						}}
						nearbyPlacesAPI="GooglePlacesSearch"
						debounce={400}
					/>
				</View>
				<NavFavourites type="destination" />
			</View>
			<View
				style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
			>
				<TouchableOpacity
					onPress={() => navigation.navigate("RideOptionsCard")}
					style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
				>
					<Icon name="car" type="font-awesome" color="white" size={16} />
					<Text style={tw`text-white text-center`}>Rides</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
				>
					<Icon
						name="fast-food-outline"
						type="ionicon"
						color="black"
						size={16}
					/>
					<Text style={tw`text-center`}>Eats</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingTop: 20,
		flex: 0,
	},
	textInput: {
		backgroundColor: "#DDDDDF",
		borderRadius: 0,
		fontSize: 18,
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingBottom: 0,
	},
});
