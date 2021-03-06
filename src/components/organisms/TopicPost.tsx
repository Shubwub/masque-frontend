import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableHighlight,
	Alert,
} from "react-native";
import {
	mainColour,
	mainLight,
	mainDark,
	disabled,
} from "../../../style_variables";
import { postTopic } from "../../services/api/topics";
import { TopicInterface } from "../../interfaces";

export default function TopicPost({ navigation }: { navigation: any }) {
	const [topicTitle, setTopicTitle] = useState<string>("");
	const [topicText, setTopicText] = useState<string>("");
	const [highlighted, toggleHighlighted] = useState<boolean>(false);

	return (
		<View style={styles.inputContainer}>
			<TextInput
				onChangeText={setTopicTitle}
				value={topicTitle}
				style={[styles.input, styles.titleInput]}
				multiline
				numberOfLines={2}
				autoCapitalize="words"
				maxLength={125}
				autoFocus
				placeholder="Enter a title (Max 125)"
				placeholderTextColor={disabled}
			/>
			<TextInput
				onChangeText={setTopicText}
				value={topicText}
				style={[styles.input, styles.textInput]}
				multiline
				placeholder="Say what you want to say"
				placeholderTextColor={disabled}
			/>
			<TouchableHighlight
				activeOpacity={1}
				underlayColor={mainColour}
				onShowUnderlay={() => {
					toggleHighlighted(true);
				}}
				onHideUnderlay={() => {
					toggleHighlighted(false);
				}}
				onPress={() => {
					navigator.geolocation.getCurrentPosition(
						async ({ coords: { latitude, longitude } }) => {
							const posted: TopicInterface = await postTopic(
								topicTitle,
								topicText,
								4,
								longitude,
								latitude
							);
							navigation.navigate("Comments", { topic_id: posted.id });
						},
						(error) => Alert.alert(error.message),
						{ enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
					);
				}}
				style={styles.submit}
			>
				<Text style={highlighted ? styles.highlightedColour : styles.colour}>
					POST
				</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: { padding: 15 },
	colour: { color: mainColour, alignSelf: "center" },
	highlightedColour: { color: mainDark, alignSelf: "center" },
	heading: {
		color: mainColour,
		fontSize: 26,
		marginBottom: 20,
	},
	input: {
		borderBottomColor: mainColour,
		borderBottomWidth: 1,
		color: mainLight,
	},
	titleInput: {
		fontWeight: "bold",
		marginBottom: 15,
	},
	textInput: {
		marginBottom: 50,
	},
	submit: {
		padding: 20,
		borderColor: mainColour,
		borderWidth: 5,
		width: 200,
		color: mainColour,
		alignSelf: "center",
	},
});
