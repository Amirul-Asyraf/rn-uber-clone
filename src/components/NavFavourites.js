import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const data = [
	{
		id: "123",
		icon: "home",
		name: "Home",
		destination: "Code Street, London, UK",
		location: {
			lat: 51.5223932,
			lng: -0.07082999999999999,
		},
	},
	{
		id: "456",
		icon: "briefcase",
		name: "Work",
		destination: "London Eye, London, UK",
		location: {
			lat: 51.5031864,
			lng: -0.1195192,
		},
	},
];

const NavFavourites = ({ type = "origin" }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const dispatchOrigin = (location, destination) => {
		dispatch(
			setOrigin({
				location,
				description: destination,
			})
		);

		dispatch(setDestination(null));
	};

	const dispatchDestination = (location, destination) => {
		dispatch(
			setDestination({
				location,
				description: destination,
			})
		);

		navigation.navigate("RideOptionsCard");
	};
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => (
				<View style={[tw`bg-gray-200`, { height: 0.5 }]} />
			)}
			renderItem={({ item: { name, location, destination, icon } }) => (
				<TouchableOpacity
					onPress={() => {
						type === "origin"
							? dispatchOrigin(location, destination)
							: dispatchDestination(location, destination);
					}}
					style={tw`flex-row items-center p-5`}
				>
					<Icon
						style={tw`mr-4 rounded-full bg-gray-300 p-3`}
						name={icon}
						type="ionicon"
						size={18}
					/>
					<View>
						<Text style={tw`font-semibold text-lg`}>{name}</Text>
						<Text style={tw`text-gray-500`}>{destination}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavFavourites;

const styles = StyleSheet.create({});
