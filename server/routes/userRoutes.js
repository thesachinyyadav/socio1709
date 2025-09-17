import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data: users, error } = await supabase.from("users").select("*");
    if (error) return res.status(500).json({ error: "Error fetching users" });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (error) {
      if (error.code === "PGRST116")
        return res.status(404).json({ error: "User not found" });
      return res.status(500).json({ error: "Error fetching user" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user: authClientUser } = req.body;
    if (!authClientUser || !authClientUser.email) {
      return res
        .status(400)
        .json({ error: "Invalid user data: email is required" });
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", authClientUser.email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res.status(500).json({ error: "Error checking user existence" });
    }

    if (existingUser) {
      return res.status(200).json({
        user: existingUser,
        isNew: false,
        message: "User already exists.",
      });
    }

    let name =
      authClientUser.name || authClientUser.user_metadata?.full_name || "";
    let registerNumber = authClientUser.user_metadata?.register_number || "";
    if (name) {
      const nameParts = name.split(" ");
      if (nameParts.length > 1) {
        const lastPart = nameParts[nameParts.length - 1];
        if (/^\d+$/.test(lastPart) && !registerNumber) {
          registerNumber = lastPart;
          name = nameParts.slice(0, -1).join(" ");
        }
      }
    }

    const avatarUrl =
      authClientUser.user_metadata?.avatar_url ||
      authClientUser.user_metadata?.picture ||
      authClientUser.avatar_url ||
      authClientUser.picture ||
      null;

    const newUserPayload = {
      email: authClientUser.email,
      name: name || "New User",
      register_number: registerNumber || null,
      avatar_url: avatarUrl,
    };

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert(newUserPayload)
      .select()
      .single();

    if (insertError) {
      return res
        .status(500)
        .json({ error: `Error creating user: ${insertError.message}` });
    }
    return res.status(201).json({
      user: newUser,
      isNew: true,
      message: "User created successfully.",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
