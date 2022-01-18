import React from "react";
import { Routes, Route } from 'react-router-dom';
import IndexPage from "./components/IndexPage";
import NotFoundPage from "./components/NotFoundPage";

export default () => {
    return (<Routes>
        <Route index path="/" element={<IndexPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>);
};