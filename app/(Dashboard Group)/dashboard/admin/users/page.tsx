/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Spinner from "@/src/Components/shared/Spinner";
import { useGetAllUsers } from "@/src/features/dashboard/admin/api/admin-overview";
import { Users, Shield, User as UserIcon, Home } from "lucide-react";


export default function AdminUsersPage() {
  const { data: response, isLoading, isError } = useGetAllUsers();

  
  const users = response?.data || [];

  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            <Shield className="w-3 h-3" /> Admin
          </span>
        );
      case "OWNER":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
            <Home className="w-3 h-3" /> Owner
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <UserIcon className="w-3 h-3" /> Tenant
          </span>
        );
    }
  };

  if (isLoading) {
    return <Spinner size="lg"></Spinner>;
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Failed to load users.</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">All Users</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and view all registered users on the platform.</p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">User Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Users className="w-12 h-12 mb-3 text-gray-300" />
                      <p className="text-lg font-medium text-gray-800">No users found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    
                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold uppercase">
                          {user.email?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}