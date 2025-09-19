import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save, X } from "lucide-react";

const categories = [
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
    { value: "agama", label: "Agama" },
    { value: "anak", label: "Anak-anak" },
    { value: "kuliner", label: "Kuliner" },
    { value: "seni", label: "Seni" },
    { value: "lainnya", label: "Lainnya" }
];

const priorities = [
    { value: "rendah", label: "Rendah" },
    { value: "sedang", label: "Sedang" },
    { value: "tinggi", label: "Tinggi" }
];

const statuses = [
    { value: "pending", label: "Pending" },
    { value: "ordered", label: "Ordered" },
    { value: "received", label: "Received" },
    { value: "cancelled", label: "Cancelled" }
];

export default function RequirementForm({ requirement, onSubmit, onCancel }) {
    const [currentRequirement, setCurrentRequirement] = useState(requirement || {
        title: "",
        author: "",
        isbn: "",
        category: "fiksi",
        quantity_needed: 1,
        priority: "sedang",
        estimated_price: "",
        reason: "",
        target_date: "",
        status: "pending",
        notes: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(currentRequirement);
    };

    return (
        <Card className="bg-white shadow-lg border-slate-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                <CardTitle className="text-xl font-bold text-slate-900">
                    {requirement ? 'Edit Kebutuhan' : 'Tambah Kebutuhan Buku'}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-800 font-medium">
                                Judul Buku *
                            </Label>
                            <Input
                                id="title"
                                value={currentRequirement.title}
                                onChange={(e) => setCurrentRequirement({...currentRequirement, title: e.target.value})}
                                className="border-slate-300 focus:border-blue-400"
                                required
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="author" className="text-slate-800 font-medium">
                                Penulis *
                            </Label>
                            <Input
                                id="author"
                                value={currentRequirement.author}
                                onChange={(e) => setCurrentRequirement({...currentRequirement, author: e.target.value})}
                                className="border-slate-300 focus:border-blue-400"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="isbn" className="text-slate-800 font-medium">
                                ISBN
                            </Label>
                            <Input
                                id="isbn"
                                value={currentRequirement.isbn}
                                onChange={(e) => setCurrentRequirement({...currentRequirement, isbn: e.target.value})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-slate-800 font-medium">
                                Kategori
                            </Label>
                            <Select
                                value={currentRequirement.category}
                                onValueChange={(value) => setCurrentRequirement({...currentRequirement, category: value})}
                            >
                                <SelectTrigger className="border-slate-300 focus:border-blue-400">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.value} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity_needed" className="text-slate-800 font-medium">
                                Jumlah Dibutuhkan *
                            </Label>
                            <Input
                                id="quantity_needed"
                                type="number"
                                min="1"
                                value={currentRequirement.quantity_needed}
                                onChange={(e) => setCurrentRequirement({...currentRequirement, quantity_needed: parseInt(e.target.value)})}
                                className="border-slate-300 focus:border-blue-400"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority" className="text-slate-800 font-medium">
                                Prioritas
                            </Label>
                            <Select
                                value={currentRequirement.priority}
                                onValueChange={(value) => setCurrentRequirement({...currentRequirement, priority: value})}
                            >
                                <SelectTrigger className="border-slate-300 focus:border-blue-400">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {priorities.map((priority) => (
                                        <SelectItem key={priority.value} value={priority.value}>
                                            {priority.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="estimated_price" className="text-slate-800 font-medium">
                                Estimasi Harga per Unit (Rp)
                            </Label>
                            <Input
                                id="estimated_price"
                                type="number"
                                value={currentRequirement.estimated_price}
                                onChange={(e) => setCurrentRequirement({...currentRequirement, estimated_price: parseInt(e.target.value)})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="target_date" className="text-slate-800 font-medium">
                                Target Tanggal Pengadaan
                            </Label>
                            <Input
                                id="target_date"
                                type="date"
                                value={currentRequirement.target_date}
                                onChange={(e) => setCurrentRequirement({...currentRequirement, target_date: e.target.value})}
                                className="border-slate-300 focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-slate-800 font-medium">
                                Status
                            </Label>
                            <Select
                                value={currentRequirement.status}
                                onValueChange={(value) => setCurrentRequirement({...currentRequirement, status: value})}
                            >
                                <SelectTrigger className="border-slate-300 focus:border-blue-400">
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

                    <div className="space-y-2">
                        <Label htmlFor="reason" className="text-slate-800 font-medium">
                            Alasan Membutuhkan Buku Ini
                        </Label>
                        <Textarea
                            id="reason"
                            value={currentRequirement.reason}
                            onChange={(e) => setCurrentRequirement({...currentRequirement, reason: e.target.value})}
                            className="border-slate-300 focus:border-blue-400 h-24"
                            placeholder="Jelaskan mengapa buku ini dibutuhkan..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-slate-800 font-medium">
                            Catatan Tambahan
                        </Label>
                        <Textarea
                            id="notes"
                            value={currentRequirement.notes}
                            onChange={(e) => setCurrentRequirement({...currentRequirement, notes: e.target.value})}
                            className="border-slate-300 focus:border-blue-400 h-24"
                            placeholder="Catatan atau informasi tambahan..."
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={onCancel}
                            className="border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Batal
                        </Button>
                        <Button 
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {requirement ? 'Perbarui' : 'Simpan'} Kebutuhan
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}