import React from 'react'; 
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import tvkFlag from '@/assets/tvk flag.jpg';

interface SimpleHeaderProps {
	onOpenManifesto: () => void;
	view: string;
	setView: (view: string) => void;
	user?: any;
	onGoogleLogin?: () => void;
}

export function SimpleHeader({ onOpenManifesto, view, setView, user, onGoogleLogin }: SimpleHeaderProps) {
	const [open, setOpen] = React.useState(false);

	const links = [
		{
			label: 'Welfare Schemes',
			href: '#schemes',
			onClick: () => {
				setView('welfare');
				setOpen(false);
			}
		},
		{
			label: 'Eligibility Checker',
			href: '#eligibility',
			onClick: () => {
				setView('welfare');
				setOpen(false);
			}
		},
	];

	return (
		<header className="bg-white/95 supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 w-full border-b border-[#e9ecef] backdrop-blur-lg">
			<nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-8">
				{/* LOGO AREA */}
				<div className="flex items-center gap-3">
					<img 
						src={tvkFlag} 
						alt="TVK Flag" 
						className="h-7 w-11 rounded border border-zinc-200 shadow-sm object-cover"
					/>
					<p className="font-sans text-xl font-black uppercase tracking-tight text-[#800020]">
						Makkal Connect <span className="text-[#ffcc00]">●</span>
					</p>
				</div>

				{/* DESKTOP NAV */}
				<div className="hidden items-center gap-3 lg:flex">
					{links.map((link) => (
						<a
							key={link.label}
							className={buttonVariants({ variant: 'ghost', className: 'text-zinc-600 hover:text-[#800020] font-bold text-xs uppercase tracking-wider cursor-pointer' })}
							href={link.href}
							onClick={link.onClick}
						>
							{link.label}
						</a>
					))}

					{/* 🖥️ ALL MANIFESTO DROPDOWN */}
					<div className="relative group/dropdown">
						<button
							className={buttonVariants({ variant: 'ghost', className: 'text-zinc-600 hover:text-[#800020] font-bold text-xs uppercase tracking-wider h-10 px-4 py-2 cursor-pointer flex items-center gap-1.5' })}
						>
							All Manifesto <span className="text-[10px] text-zinc-400">▼</span>
						</button>
						<div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white border border-[#e9ecef] rounded-2xl shadow-xl p-2 hidden group-hover/dropdown:block animate-fadeIn z-50">
							<button
								onClick={onOpenManifesto}
								className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-black uppercase text-zinc-600 hover:bg-[#800020]/5 hover:text-[#800020] transition duration-150 cursor-pointer"
							>
								📋 Full Resolution Modal
							</button>
							<button
								onClick={() => setView('manifesto')}
								className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black uppercase transition duration-150 cursor-pointer ${view === 'manifesto' ? 'bg-[#ffcc00] text-[#1a1a1a]' : 'text-zinc-600 hover:bg-[#800020]/5 hover:text-[#800020]'}`}
							>
								🖥️ Master Light Console
							</button>
						</div>
					</div>

					{!user ? (
						<button 
							onClick={onGoogleLogin}
							className={buttonVariants({ variant: 'outline', className: 'border-[#800020]/20 text-[#800020] hover:bg-[#800020]/5 font-bold text-xs uppercase tracking-wider px-4 rounded-xl cursor-pointer flex items-center gap-1.5' })}
						>
							<span>🌐</span> Google Sign In
						</button>
					) : (
						<div className="flex items-center gap-2 bg-[#800020]/5 px-3.5 py-2 rounded-xl border border-[#800020]/15 text-xs font-extrabold font-mono text-[#800020] select-none shadow-sm">
							✓ Verified: {user.displayName?.split(' ')[0]}
						</div>
					)}
					<a 
						href="#eligibility"
						onClick={() => setView('welfare')}
						className={buttonVariants({ className: 'bg-[#ffcc00] hover:bg-[#e6b800] text-[#1a1a1a] font-black text-xs uppercase tracking-widest px-5 rounded-xl transition shadow-sm' })}
					>
						Get Started
					</a>
				</div>

				{/* MOBILE NAV BUTTON */}
				<Sheet open={open} onOpenChange={setOpen}>
					<Button size="icon" variant="outline" className="lg:hidden border-zinc-200 rounded-xl hover:bg-zinc-50" onClick={() => setOpen(true)}>
						<MenuToggle
							strokeWidth={2.5}
							open={open}
							onOpenChange={setOpen}
							className="size-5 text-[#800020]"
						/>
					</Button>
					
					<SheetContent
						className="bg-white/95 supports-[backdrop-filter]:bg-white/80 gap-0 backdrop-blur-lg border-r border-[#e9ecef]"
						showClose={false}
						side="left"
					>
						<div className="flex items-center gap-2.5 px-6 pt-8 pb-4 border-b border-zinc-100">
							<img 
								src={tvkFlag} 
								alt="TVK Flag" 
								className="h-6 w-9 rounded border border-zinc-200 shadow-sm object-cover"
							/>
							<p className="font-sans text-lg font-black uppercase tracking-tight text-[#800020]">
								Makkal Connect
							</p>
						</div>

						<div className="grid gap-y-2 overflow-y-auto px-4 pt-8 pb-5">
							{links.map((link) => (
								<a
									key={link.label}
									className={buttonVariants({
										variant: 'ghost',
										className: 'justify-start text-zinc-700 hover:text-[#800020] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl',
									})}
									href={link.href}
									onClick={link.onClick}
								>
									{link.label}
								</a>
							))}
							
							{/* MOBILE ALL MANIFESTO CONTROLS */}
							<button
								onClick={() => {
									onOpenManifesto();
									setOpen(false);
								}}
								className={buttonVariants({
									variant: 'ghost',
									className: 'justify-start text-zinc-700 hover:text-[#800020] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl cursor-pointer w-full text-left h-auto',
								})}
							>
								📋 Full Resolution Modal
							</button>

							<button
								onClick={() => {
									setView('manifesto');
									setOpen(false);
								}}
								className={buttonVariants({
									variant: 'ghost',
									className: `justify-start font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl cursor-pointer w-full text-left h-auto ${view === 'manifesto' ? 'bg-[#ffcc00] text-[#1a1a1a]' : 'text-zinc-700 hover:text-[#800020]'}`,
								})}
							>
								🖥️ Master Light Console
							</button>
						</div>

						<SheetFooter className="mt-auto flex flex-col gap-2 p-6 border-t border-zinc-100 bg-[#f8f9fa]">
							{!user ? (
								<button 
									className={buttonVariants({ variant: 'outline', className: 'w-full border-zinc-300 text-zinc-700 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5' })}
									onClick={() => {
										if (onGoogleLogin) onGoogleLogin();
										setOpen(false);
									}}
								>
									<span>🌐</span> Google Sign In
								</button>
							) : (
								<div className="w-full bg-[#800020]/5 py-3 rounded-xl border border-[#800020]/15 text-center text-xs font-extrabold font-mono text-[#800020] select-none shadow-sm">
									✓ Verified: {user.displayName?.split(' ')[0]}
								</div>
							)}
							<a 
								href="#eligibility"
								className={buttonVariants({ className: 'w-full bg-[#ffcc00] hover:bg-[#e6b800] text-[#1a1a1a] font-black text-xs uppercase tracking-widest py-3.5 rounded-xl' })}
								onClick={() => {
									setView('welfare');
									setOpen(false);
								}}
							>
								Check Eligibility
							</a>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
