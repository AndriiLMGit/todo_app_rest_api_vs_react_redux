import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Features } from "./pages/Features";
import { CreateTasks } from "./pages/CreateTasks";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Tasks } from "./pages/Tasks";
import { EditTask } from "./pages/EditTask";
import { NotFound } from "./components/NotFound";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="create-tasks" element={<CreateTasks />} />
        <Route path="edit-task/:id" element={<EditTask />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="*" element={<NotFound />} />
        <Route path="account/">
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  );
};
