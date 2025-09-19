import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

const genres = [
    { value: "all", label: "Semua Genre" },
    { value: "fiksi", label: "Fiksi" },
    { value: "non_fiksi", label: "Non-Fiksi" },
    { value: "biografi", label: "Biografi" },
    { value: "sejarah", label: "Sejarah" },
    { value: "sains", label: "Sains" },
    { value: "teknologi", label: "Teknologi" },
    { value: "bisnis", label: "Bisnis" },
    { value: "self_help", label: "Self Help" },
    { value: "romance", label: "Romance" },
    { value: "mystery", label: "Mystery" },
    { value: "fantasy", label: "Fantasy" },
    { value: "horror", label: "Horror" },
    { value: "komedi", label: "Komedi" },
    { value: "drama", label: "Drama" },
    { value: "petualangan", label: "Petualangan" },
    { value: "lainnya", label: "Lainnya" }
];

const statuses = [
    { value: "all", label: "Semua Status" },
    { value: "belum_dibaca", label: "Belum Dibaca" },
    { value: "ingin_dibaca", label: "Ingin Dibaca" },
    { value: "sedang_dibaca", label: "Sedang Dibaca" },
    { value: "sudah_dibaca", label: "Sudah Dibaca" }
];

export default function BookFilters({ onFilterChange, searchQuery, setSearchQuery }) {
    const [genre, setGenre] = React.useState("all");
    const [status, setStatus] = React.useState("all");

    const handleFilterChange = (type, value) => {
        if (type === "genre") setGenre(value);
        if (type === "status") setStatus(value);
        onFilterChange({
            genre: type === "genre" ? value : genre,
            status: type === "status" ? value : status
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-4 h-4" />
                        <Input
                            placeholder="Cari judul buku atau penulis..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 border-amber-200 focus:border-amber-400"
                        />
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-amber-600" />
                        <Select value={genre} onValueChange={(value) => handleFilterChange("genre", value)}>
                            <SelectTrigger className="w-40 border-amber-200 focus:border-amber-400">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {genres.map((genre) => (
                                    <SelectItem key={genre.value} value={genre.value}>
                                        {genre.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-amber-600" />
                        <Select value={status} onValueChange={(value) => handleFilterChange("status", value)}>
                            <SelectTrigger className="w-40 border-amber-200 focus:border-amber-400">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}