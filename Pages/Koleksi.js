import React, { useState, useEffect, useCallback } from "react";
import { Book } from "@/entities/Book";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import BookCard from "../components/books/BookCard";
import BookFilters from "../components/books/BookFilters";
import BookForm from "../components/books/BookForm";

export default function KoleksiPage() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ genre: "all", status: "all" });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        setIsLoading(true);
        try {
            const fetchedBooks = await Book.list('-created_date');
            setBooks(fetchedBooks);
        } catch (error) {
            console.error("Error loading books:", error);
        }
        setIsLoading(false);
    };

    const filterBooks = useCallback(() => {
        let filtered = books;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(book =>
                book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by genre
        if (filters.genre !== "all") {
            filtered = filtered.filter(book => book.genre === filters.genre);
        }

        // Filter by status
        if (filters.status !== "all") {
            filtered = filtered.filter(book => book.status === filters.status);
        }

        setFilteredBooks(filtered);
    }, [books, searchQuery, filters]);

    useEffect(() => {
        filterBooks();
    }, [filterBooks]); // Depend on the memoized filterBooks function

    const handleSubmit = async (bookData) => {
        try {
            if (editingBook) {
                await Book.update(editingBook.id, bookData);
            } else {
                await Book.create(bookData);
            }
            setShowForm(false);
            setEditingBook(null);
            loadBooks(); // Reload books after submission
        } catch (error) {
            console.error("Error saving book:", error);
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingBook(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                    <p className="text-amber-700">Memuat koleksi buku...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl font-bold text-amber-900 mb-2"
                        >
                            Koleksi Buku Anda
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-amber-700"
                        >
                            Kelola dan jelajahi perpustakaan pribadi Anda
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-3"
                    >
                        <Button 
                            onClick={() => setShowForm(!showForm)}
                            className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Buku
                        </Button>
                        <Link to={createPageUrl("TambahBuku")}>
                            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                                <BookOpen className="w-5 h-5 mr-2" />
                                Form Lengkap
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 overflow-hidden"
                        >
                            <BookForm
                                book={editingBook}
                                onSubmit={handleSubmit}
                                onCancel={handleCancel}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <BookFilters 
                        onFilterChange={setFilters}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </motion.div>

                {books.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center py-16"
                    >
                        <BookOpen className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-amber-800 mb-2">
                            Koleksi Masih Kosong
                        </h3>
                        <p className="text-amber-600 mb-6">
                            Mulai bangun perpustakaan digital Anda dengan menambahkan buku pertama
                        </p>
                        <Button 
                            onClick={() => setShowForm(true)}
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Buku Pertama
                        </Button>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-4"
                        >
                            <p className="text-amber-700">
                                Menampilkan {filteredBooks.length} dari {books.length} buku
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            <AnimatePresence>
                                {filteredBooks.map((book, index) => (
                                    <motion.div
                                        key={book.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <BookCard
                                            book={book}
                                            onEdit={handleEdit}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredBooks.length === 0 && books.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <BookOpen className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                                    Tidak Ada Buku yang Cocok
                                </h3>
                                <p className="text-amber-600">
                                    Coba ubah kriteria pencarian atau filter Anda
                                </p>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}