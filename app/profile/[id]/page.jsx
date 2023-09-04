"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import Profile from "@components/Profile";

const AnotherProfile = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const userName = searchParams.get("username");
	const { data: session } = useSession();
	const pathname = usePathname();
	const id = pathname.split("/").pop();
	const [posts, setPosts] = useState([]);
	if (id === session?.user.id) {
		router.push("/profile");
		return;
	}
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
