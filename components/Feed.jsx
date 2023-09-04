"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, searchText }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data
				.filter((post) => {
					if (searchText === "") return post;
					const string = String(
						post.creator.username + post.prompt + post.tag
					).toLowerCase();
					if (string.includes(searchText.toLowerCase())) return post;
				})
				.map((post) => {
					return (
						<PromptCard
							key={post._id}
							post={post}
							handleTagClick={handleTagClick}
						/>
					);
				})}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [timeout, setTimeoutId] = useState(null);
	const [searchPrompt, setSearchPrompt] = useState("");
	const [posts, setPosts] = useState([]);
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchText(value);
		clearTimeout(timeout); // Clear any existing timeout

		setTimeoutId(
			setTimeout(() => {
				setSearchPrompt(value);
			}, 500)
		);
	};
	const handleTagClick = (tag) => {
		setSearchText(tag);
		setSearchPrompt(tag);
	};
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			<PromptCardList
				searchText={searchPrompt}
				data={posts}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
};

export default Feed;
