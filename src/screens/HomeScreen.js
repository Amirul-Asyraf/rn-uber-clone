import React, { useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { selectOrigin, setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const mapRef = useRef(null);
	const origin = useSelector(selectOrigin);

	useEffect(() => {
		if (!origin) return;
		mapRef.current?.setAddressText(origin.description);
	}, [origin]);

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image
					style={{
						width: 100,
						height: 100,
						resizeMode: "contain",
					}}
					source={{
						uri: "https://links.papareact.com/gzs",
					}}
				/>
				<GooglePlacesAutocomplete
					ref={mapRef}
					placeholder="Where from?"
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);

						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					enablePoweredByContainer={false}
					minLength={2}
					query={{
						key: GOOGLE_MAPS_KEY,
						language: "en",
					}}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
				/>
				<NavOptions />
				<NavFavourites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
