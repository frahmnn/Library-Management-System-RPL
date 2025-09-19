import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
    Calendar,
    DollarSign,
    Pencil,
    Users,
    AlertCircle,
    CheckCircle,
    Clock,
    XCircle
} from "lucide-react";
import { format } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function RequirementCard({ requirement, onEdit, onStatusUpdate }) {
    const priorityColors = {
        tinggi: "bg-red-100 text-red-800 border-red-200",
        sedang: "bg-yellow-100 text-yellow-800 border-yellow-200",
        rendah: "bg-green-100 text-green-800 border-green-200"
    };

    const statusColors = {
        pending: "bg-orange-100 text-orange-800",
        ordered: "bg-blue-100 text-blue-800",
        received: "bg-green-100 text-green-800",
        cancelled: "bg-gray-100 text-gray-800"
    };

    const statusIcons = {
        pending: <Clock className="w-3 h-3" />,
        ordered: <AlertCircle className="w-3 h-3" />,
        received: <CheckCircle className="w-3 h-3" />,
        cancelled: <XCircle className="w-3 h-3" />
    };

    return (
        <Card className="hover:shadow-lg transition-all duration-300 bg-white border-slate-200">
            <CardHeader className="p-4">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">
                            {requirement.title}
                        </h3>
                        <p className="text-slate-600 font-medium text-sm mb-3">
                            oleh {requirement.author}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                            <Badge 
                                className={`${priorityColors[requirement.priority]} border font-medium`}
                            >
                                Prioritas {requirement.priority}
                            </Badge>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer hover:opacity-80 ${statusColors[requirement.status]}`}>
                                        {statusIcons[requirement.status]}
                                        {requirement.status}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => onStatusUpdate(requirement.id, "pending")}>
                                        <Clock className="w-4 h-4 mr-2" />
                                        Pending
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onStatusUpdate(requirement.id, "ordered")}>
                                        <AlertCircle className="w-4 h-4 mr-2" />
                                        Ordered
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onStatusUpdate(requirement.id, "received")}>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Received
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onStatusUpdate(requirement.id, "cancelled")}>
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Cancelled
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Badge variant="outline" className="capitalize">
                                {requirement.category?.replace('_', ' ')}
                            </Badge>
                        </div>
                    </div>
                    
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(requirement)}
                        className="text-slate-600 hover:text-slate-800 hover:bg-slate-50 shrink-0"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">Qty: {requirement.quantity_needed}</span>
                    </div>
                    
                    {requirement.estimated_price && (
                        <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">
                                Rp {(requirement.estimated_price * requirement.quantity_needed).toLocaleString('id-ID')}
                            </span>
                        </div>
                    )}
                    
                    {requirement.target_date && (
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">
                                {format(new Date(requirement.target_date), "dd/MM/yyyy")}
                            </span>
                        </div>
                    )}
                </div>

                {requirement.reason && (
                    <div className="mb-4">
                        <p className="text-sm font-medium text-slate-700 mb-1">Alasan:</p>
                        <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded">
                            {requirement.reason}
                        </p>
                    </div>
                )}

                {requirement.notes && (
                    <div>
                        <p className="text-sm font-medium text-slate-700 mb-1">Catatan:</p>
                        <p className="text-sm text-slate-600">
                            {requirement.notes}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}