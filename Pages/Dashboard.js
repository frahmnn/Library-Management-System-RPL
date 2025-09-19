import React, { useState, useEffect } from "react";
import { Book, BookRequirement } from "@/entities/all";
import { motion } from "framer-motion";
import { 
    BookOpen, 
    Package, 
    ClipboardList, 
    AlertTriangle,
    TrendingUp,
    Users,
    DollarSign,
    Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import StatsCard from "../components/dashboard/StatsCard";

export default function Dashboard() {
    const [books, setBooks] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [booksData, requirementsData] = await Promise.all([
                Book.list('-created_date'),
                BookRequirement.list('-created_date')
            ]);
            setBooks(booksData);
            setRequirements(requirementsData);
        } catch (error) {
            console.error("Error loading data:", error);
        }
        setIsLoading(false);
    };

    const getTotalStock = () => {
        return books.reduce((sum, book) => sum + (book.stock_current || 0), 0);
    };

    const getLowStockBooks = () => {
        return books.filter(book => (book.stock_current || 0) <= (book.stock_minimum || 1));
    };

    const getPendingRequirements = () => {
        return requirements.filter(req => req.status === 'pending').length;
    };

    const getTotalValue = () => {
        return books.reduce((sum, book) => sum + ((book.price || 0) * (book.stock_current || 0)), 0);
    };

    const getCategoryStats = () => {
        const categoryCount = {};
        books.forEach(book => {
            const category = book.category || 'lainnya';
            categoryCount[category] = (categoryCount[category] || 0) + (book.stock_current || 0);
        });
        return Object.entries(categoryCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
    };

    const getRecentBooks = () => {
        return books
            .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
            .slice(0, 5);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-blue-700">Memuat dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Perpustakaan</h1>
                    <p className="text-slate-600">Selamat datang! Berikut ringkasan perpustakaan Anda</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <StatsCard
                            title="Total Buku"
                            value={books.length}
                            icon={BookOpen}
                            bgColor="bg-blue-500"
                            change="5 buku baru"
                            changeType="up"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <StatsCard
                            title="Total Stock"
                            value={getTotalStock()}
                            icon={Package}
                            bgColor="bg-green-500"
                            change={`${getLowStockBooks().length} stock rendah`}
                            changeType={getLowStockBooks().length > 0 ? "down" : "up"}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <StatsCard
                            title="Kebutuhan Pending"
                            value={getPendingRequirements()}
                            icon={ClipboardList}
                            bgColor="bg-orange-500"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <StatsCard
                            title="Nilai Total"
                            value={`Rp ${getTotalValue().toLocaleString('id-ID')}`}
                            icon={DollarSign}
                            bgColor="bg-purple-500"
                        />
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Low Stock Alert */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-600">
                                    <AlertTriangle className="w-5 h-5" />
                                    Stock Rendah
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {getLowStockBooks().length === 0 ? (
                                    <p className="text-slate-500 text-center py-4">Semua stock aman</p>
                                ) : (
                                    <div className="space-y-3">
                                        {getLowStockBooks().slice(0, 5).map((book) => (
                                            <div key={book.id} className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-slate-900">{book.title}</p>
                                                    <p className="text-sm text-slate-500">{book.author}</p>
                                                </div>
                                                <Badge variant="destructive">
                                                    {book.stock_current || 0} tersisa
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Category Distribution */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Top Kategori
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {getCategoryStats().map(([category, count]) => (
                                        <div key={category}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium capitalize">
                                                    {category.replace('_', ' ')}
                                                </span>
                                                <span className="text-sm text-slate-500">{count} buku</span>
                                            </div>
                                            <Progress value={(count / getTotalStock()) * 100} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Recent Books */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Buku Terbaru
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {getRecentBooks().length === 0 ? (
                                    <p className="text-slate-500 text-center py-4">Belum ada buku</p>
                                ) : (
                                    <div className="space-y-3">
                                        {getRecentBooks().map((book) => (
                                            <div key={book.id} className="border-l-4 border-blue-500 pl-3">
                                                <p className="font-medium text-slate-900">{book.title}</p>
                                                <p className="text-sm text-slate-500">{book.author}</p>
                                                <p className="text-xs text-slate-400">
                                                    Stock: {book.stock_current || 0}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}