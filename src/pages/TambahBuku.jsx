import React, { useState } from "react";
import { Book } from "../entities/Book";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

import BookForm from "../components/books/BookForm";

export default function TambahBukuPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (bookData) => {
        setIsSubmitting(true);
        try {
            await Book.create(bookData);
            navigate(createPageUrl("Koleksi"));
        } catch (error) {
            console.error("Error creating book:", error);
        }
        setIsSubmitting(false);
    };

    const handleCancel = () => {
        navigate(createPageUrl("Koleksi"));
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(createPageUrl("Koleksi"))}
                        className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-amber-900">
                            Tambah Buku Baru
                        </h1>
                        <p className="text-amber-700 mt-1">
                            Lengkapi informasi buku untuk menambahkannya ke koleksi Anda
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <BookForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isSubmitting={isSubmitting}
                    />
                </motion.div>
            </div>
        </div>
    );
}