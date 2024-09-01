// import { useState } from "react"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"

// export default function Component() {
//   const [isDarkMode, setIsDarkMode] = useState(false)
//   return (
//     <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
//       <header className="bg-background dark:bg-background-dark py-4 px-6 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <MountainIcon className="h-6 w-6 text-primary dark:text-primary-dark" />
//           <h1 className="text-xl font-bold text-foreground dark:text-foreground-dark">Dashboard</h1>
//         </div>
//         <button
//           onClick={() => setIsDarkMode(!isDarkMode)}
//           className="bg-muted dark:bg-muted-dark p-2 rounded-full transition-colors hover:bg-accent dark:hover:bg-accent-dark"
//         >
//           {isDarkMode ? (
//             <SunIcon className="h-5 w-5 text-foreground dark:text-foreground-dark" />
//           ) : (
//             <MoonIcon className="h-5 w-5 text-foreground dark:text-foreground-dark" />
//           )}
//         </button>
//       </header>
//       <main className="flex-1 bg-muted/40 dark:bg-muted-dark/40 p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Total Revenue</CardTitle>
//               <DollarSignIcon className="h-5 w-5 text-muted-foreground dark:text-muted-foreground-dark" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-foreground dark:text-foreground-dark">$45,231.89</div>
//               <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark">+20.1% from last month</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Subscriptions</CardTitle>
//               <UsersIcon className="h-5 w-5 text-muted-foreground dark:text-muted-foreground-dark" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-foreground dark:text-foreground-dark">+2350</div>
//               <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark">+180.1% from last month</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Sales</CardTitle>
//               <CreditCardIcon className="h-5 w-5 text-muted-foreground dark:text-muted-foreground-dark" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-foreground dark:text-foreground-dark">+12,234</div>
//               <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark">+19% from last month</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Active Now</CardTitle>
//               <ActivityIcon className="h-5 w-5 text-muted-foreground dark:text-muted-foreground-dark" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-foreground dark:text-foreground-dark">+573</div>
//               <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark">+201 since last hour</p>
//             </CardContent>
//           </Card>
//         </div>
//         <div className="mt-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Orders</CardTitle>
//               <Button variant="outline" size="sm">
//                 View All
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Order</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead>Date</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell className="font-medium">INV001</TableCell>
//                     <TableCell>
//                       <Badge variant="outline">Paid</Badge>
//                     </TableCell>
//                     <TableCell>$250.00</TableCell>
//                     <TableCell>2023-07-12</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">INV002</TableCell>
//                     <TableCell>
//                       <Badge variant="outline">Pending</Badge>
//                     </TableCell>
//                     <TableCell>$150.00</TableCell>
//                     <TableCell>2023-07-11</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell className="font-medium">INV003</TableCell>
//                     <TableCell>
//                       <Badge variant="outline">Unpaid</Badge>
//                     </TableCell>
//                     <TableCell>$350.00</TableCell>
//                     <TableCell>2023-07-10</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }

// function ActivityIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
//     </svg>
//   )
// }


// function CreditCardIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="20" height="14" x="2" y="5" rx="2" />
//       <line x1="2" x2="22" y1="10" y2="10" />
//     </svg>
//   )
// }


// function DollarSignIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="12" x2="12" y1="2" y2="22" />
//       <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//     </svg>
//   )
// }


// function MoonIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
//     </svg>
//   )
// }


// function MountainIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   )
// }


// function SunIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="4" />
//       <path d="M12 2v2" />
//       <path d="M12 20v2" />
//       <path d="m4.93 4.93 1.41 1.41" />
//       <path d="m17.66 17.66 1.41 1.41" />
//       <path d="M2 12h2" />
//       <path d="M20 12h2" />
//       <path d="m6.34 17.66-1.41 1.41" />
//       <path d="m19.07 4.93-1.41 1.41" />
//     </svg>
//   )
// }


// function UsersIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   )
// }