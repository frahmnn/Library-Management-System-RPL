import React, { useState, useEffect, useCallback } from "react";
import { Book } from "@/entities/Book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function StockBukuPage() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [stockFilter, setStockFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    const [stockAdjustment, setStockAdjustment] = useState({ type: "add", quantity: 1, reason: "" });

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
                book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.location?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by stock level
        if (stockFilter === "low") {
            filtered = filtered.filter(book => (book.stock_current || 0) <= (book.stock_minimum || 1));
        } else if (stockFilter === "out") {
            filtered = filtered.filter(book => (book.stock_current || 0) === 0);
        } else if (stockFilter === "available") {
            filtered = filtered.filter(book => (book.stock_current || 0) > (book.stock_minimum || 1));
        }

        setFilteredBooks(filtered);
    }, [books, searchQuery, stockFilter]); // Dependencies for useCallback

    useEffect(() => {
        filterBooks();
    }, [filterBooks]); // Now filterBooks is a stable dependency

    const getStockStatistics = () => {
        const totalBooks = books.length;
        const totalStock = books.reduce((sum, book) => sum + (book.stock_current || 0), 0);
        const lowStockBooks = books.filter(book => (book.stock_current || 0) <= (book.stock_minimum || 1)).length;
        const outOfStockBooks = books.filter(book => (book.stock_current || 0) === 0).length;
        const totalValue = books.reduce((sum, book) => sum + ((book.price || 0) * (book.stock_current || 0)), 0);
        
        return { totalBooks, totalStock, lowStockBooks, outOfStockBooks, totalValue };
    };

    const handleStockAdjustment = async () => {
        if (!selectedBook) return;
        
        try {
            const currentStock = selectedBook.stock_current || 0;
            let newStock = currentStock;
            
            if (stockAdjustment.type === "add") {
                newStock = currentStock + stockAdjustment.quantity;
            } else if (stockAdjustment.type === "subtract") {
                newStock = Math.max(0, currentStock - stockAdjustment.quantity);
            } else if (stockAdjustment.type === "set") {
                newStock = stockAdjustment.quantity;
            }

            await Book.update(selectedBook.id, {
                ...selectedBook,
                stock_current: newStock
            });

            setSelectedBook(null);
            setStockAdjustment({ type: "add", quantity: 1, reason: "" });
            loadBooks();
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    const getStockStatus = (book) => {
        const current = book.stock_current || 0;
        const minimum = book.stock_minimum || 1;
        
        if (current === 0) return { status: "Habis", color: "bg-red-500", textColor: "text-red-700" };
        if (current <= minimum) return { status: "Rendah", color: "bg-yellow-500", textColor: "text-yellow-700" };
        return { status: "Tersedia", color: "bg-green-500", textColor: "text-green-700" };
    };

    if (isLoading) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-blue-700">Memuat data stock...</p>
                </div>
            </div>
        );
    }

    const stats = getStockStatistics();

    return (
        <div className="min-h-screen p-4 md:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Stock Buku</h1>
                    <p className="text-slate-600">Monitor dan kelola stock buku perpustakaan</p>
                </motion.div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-blue-100">
                                        <Package className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{stats.totalStock}</p>
                                        <p className="text-sm text-slate-600">Total Stock</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-red-100">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{stats.lowStockBooks}</p>
                                        <p className="text-sm text-slate-600">Stock Rendah</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-gray-100">
                                        <TrendingDown className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{stats.outOfStockBooks}</p>
                                        <p className="text-sm text-slate-600">Habis Stock</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-green-100">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{stats.totalBooks}</p>
                                        <p className="text-sm text-slate-600">Jenis Buku</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-purple-100">
                                        <Package className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-slate-900">
                                            Rp {stats.totalValue.toLocaleString('id-ID')}
                                        </p>
                                        <p className="text-sm text-slate-600">Nilai Total</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                                <CardTitle>Stock Buku ({filteredBooks.length})</CardTitle>
                                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <Input
                                            placeholder="Cari buku atau lokasi..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 w-full sm:w-80"
                                        />
                                    </div>
                                    <select
                                        value={stockFilter}
                                        onChange={(e) => setStockFilter(e.target.value)}
                                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Semua Stock</option>
                                        <option value="available">Tersedia</option>
                                        <option value="low">Stock Rendah</option>
                                        <option value="out">Habis Stock</option>
                                    </select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Buku</TableHead>
                                            <TableHead>Lokasi</TableHead>
                                            <TableHead>Stock Saat Ini</TableHead>
                                            <TableHead>Stock Min</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Nilai Stock</TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredBooks.map((book) => {
                                            const stockStatus = getStockStatus(book);
                                            const stockPercentage = Math.min(100, ((book.stock_current || 0) / Math.max(book.stock_minimum || 1, 10)) * 100);
                                            
                                            return (
                                                <TableRow key={book.id} className="hover:bg-slate-50">
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium text-slate-900">{book.title}</p>
                                                            <p className="text-sm text-slate-500">{book.author}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            {book.location || 'Tidak ditentukan'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-lg font-bold ${stockStatus.textColor}`}>
                                                                    {book.stock_current || 0}
                                                                </span>
                                                            </div>
                                                            <Progress value={stockPercentage} className="h-1" />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {book.stock_minimum || 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={`${stockStatus.color} text-white border-0`}>
                                                            {stockStatus.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {book.price ? 
                                                            `Rp ${((book.price || 0) * (book.stock_current || 0)).toLocaleString('id-ID')}` 
                                                            : '-'
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => setSelectedBook(book)}
                                                                >
                                                                    Adjust Stock
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Adjust Stock - {book.title}</DialogTitle>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <p className="text-sm text-slate-600 mb-2">
                                                                            Stock saat ini: <span className="font-bold">{book.stock_current || 0}</span>
                                                                        </p>
                                                                    </div>
                                                                    
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="adjustment-type">Tipe Adjustment</Label>
                                                                        <select
                                                                            id="adjustment-type"
                                                                            value={stockAdjustment.type}
                                                                            onChange={(e) => setStockAdjustment({...stockAdjustment, type: e.target.value})}
                                                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        >
                                                                            <option value="add">Tambah Stock</option>
                                                                            <option value="subtract">Kurangi Stock</option>
                                                                            <option value="set">Set Stock</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="quantity">Jumlah</Label>
                                                                        <Input
                                                                            id="quantity"
                                                                            type="number"
                                                                            min="1"
                                                                            value={stockAdjustment.quantity}
                                                                            onChange={(e) => setStockAdjustment({...stockAdjustment, quantity: parseInt(e.target.value)})}
                                                                        />
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="reason">Alasan (Opsional)</Label>
                                                                        <Input
                                                                            id="reason"
                                                                            value={stockAdjustment.reason}
                                                                            onChange={(e) => setStockAdjustment({...stockAdjustment, reason: e.target.value})}
                                                                            placeholder="Masukkan alasan adjustment..."
                                                                        />
                                                                    </div>

                                                                    <div className="flex justify-end gap-3">
                                                                        <Button
                                                                            variant="outline"
                                                                            onClick={() => setSelectedBook(null)}
                                                                        >
                                                                            Batal
                                                                        </Button>
                                                                        <Button onClick={handleStockAdjustment}>
                                                                            Update Stock
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                                
                                {filteredBooks.length === 0 && (
                                    <div className="text-center py-16">
                                        <p className="text-slate-500">
                                            {books.length === 0 
                                                ? "Belum ada buku yang ditambahkan"
                                                : "Tidak ada buku yang cocok dengan filter"
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}