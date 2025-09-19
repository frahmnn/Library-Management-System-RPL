import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    FileText,
    Pencil,
    Star,
    BookOpen,
    Clock,
    CheckCircle2,
    Eye
} from "lucide-react";

export default function BookCard({ book, onEdit, onView }) {
    const statusColors = {
        belum_dibaca: "bg-gray-100 text-gray-700",
        sedang_dibaca: "bg-blue-100 text-blue-700",
        sudah_dibaca: "bg-green-100 text-green-700",
        ingin_dibaca: "bg-purple-100 text-purple-700"
    };

    const statusIcons = {
        belum_dibaca: <BookOpen className="w-3 h-3" />,
        sedang_dibaca: <Clock className="w-3 h-3" />,
        sudah_dibaca: <CheckCircle2 className="w-3 h-3" />,
        ingin_dibaca: <Eye className="w-3 h-3" />
    };

    const genreColors = {
        fiksi: "bg-rose-50 text-rose-700 border-rose-200",
        non_fiksi: "bg-blue-50 text-blue-700 border-blue-200",
        biografi: "bg-emerald-50 text-emerald-700 border-emerald-200",
        sejarah: "bg-amber-50 text-amber-700 border-amber-200",
        sains: "bg-violet-50 text-violet-700 border-violet-200",
        teknologi: "bg-cyan-50 text-cyan-700 border-cyan-200",
        bisnis: "bg-orange-50 text-orange-700 border-orange-200",
        self_help: "bg-teal-50 text-teal-700 border-teal-200",
        romance: "bg-pink-50 text-pink-700 border-pink-200",
        mystery: "bg-slate-50 text-slate-700 border-slate-200",
        fantasy: "bg-indigo-50 text-indigo-700 border-indigo-200",
        horror: "bg-red-50 text-red-700 border-red-200",
        komedi: "bg-yellow-50 text-yellow-700 border-yellow-200",
        drama: "bg-purple-50 text-purple-700 border-purple-200",
        petualangan: "bg-green-50 text-green-700 border-green-200",
        lainnya: "bg-gray-50 text-gray-700 border-gray-200"
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${
                    i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                }`}
            />
        ));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-amber-100 hover:border-amber-200 overflow-hidden">
                {book.cover_url && (
                    <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100">
                        <img
                            src={book.cover_url}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                
                <CardHeader className="p-4">
                    <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-amber-900 text-lg leading-tight line-clamp-2 mb-1">
                                {book.title}
                            </h3>
                            <p className="text-amber-700 font-medium text-sm mb-3">
                                oleh {book.author}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(book)}
                            className="text-amber-600 hover:text-amber-800 hover:bg-amber-50 shrink-0"
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge 
                            className={`${genreColors[book.genre]} border text-xs font-medium`}
                        >
                            {book.genre?.replace(/_/g, ' ')}
                        </Badge>
                        <Badge 
                            className={`${statusColors[book.status]} border-0 flex items-center gap-1 text-xs font-medium`}
                        >
                            {statusIcons[book.status]}
                            {book.status?.replace(/_/g, ' ')}
                        </Badge>
                    </div>

                    {book.rating && (
                        <div className="flex items-center gap-1 mb-2">
                            {renderStars(book.rating)}
                            <span className="text-sm text-amber-600 ml-1">({book.rating})</span>
                        </div>
                    )}
                </CardHeader>

                <CardContent className="p-4 pt-0">
                    <div className="space-y-2 text-sm text-amber-700">
                        {book.year && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <span>Terbit: {book.year}</span>
                            </div>
                        )}
                        {book.pages && (
                            <div className="flex items-center gap-2">
                                <FileText className="w-3 h-3" />
                                <span>{book.pages} halaman</span>
                            </div>
                        )}
                        {book.publisher && (
                            <p className="text-xs text-amber-600">
                                Penerbit: {book.publisher}
                            </p>
                        )}
                    </div>
                    
                    {book.description && (
                        <p className="text-sm text-amber-600 mt-3 line-clamp-3">
                            {book.description}
                        </p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}