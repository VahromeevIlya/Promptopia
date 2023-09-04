"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import Profile from "@components/Profile";

const AnotherProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const id = pathname.split("/").pop();
	if (id === session?.user.id) {
		router.push("/profile");
		return;
	}
	const searchParams = useSearchParams();
	const userName = searchParams.get("username");

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${id}/posts`);
			const data = await response.json();
			setPosts(data);
		};
		if (id) fetchPosts();
	}, [id]);

	return (
		<Profile name={userName} desc="Welcome to another profile" data={posts} />
	);
};

export default AnotherProfile;
