const logos = [
  "https://res.cloudinary.com/divndlntm/image/upload/v1777637751/superteam_nigeria_vlnvv0.jpg",
  "https://res.cloudinary.com/divndlntm/image/upload/v1777637751/skatechain_alqmj2.jpg",
  "https://res.cloudinary.com/divndlntm/image/upload/v1777637751/scribble_DAO_j9xupy.jpg",
  "https://res.cloudinary.com/divndlntm/image/upload/v1777637751/jupitar_dkoo7d.jpg",
  "https://res.cloudinary.com/divndlntm/image/upload/v1777637750/neutron_l4wz7z.jpg",
  "https://res.cloudinary.com/divndlntm/image/upload/v1777637750/super_team_mtpmgx.jpg",
  "https://res.cloudinary.com/divndlntm/image/upload/v1777637750/band_g3my1c.jpg",
  "https://res.cloudinary.com/divndlntm/image/upload/v1777637750/axelar_pb5yx3.jpg"
];

export default function LogoMarquee() {
  return (
    <section className="py-12 bg-[#f8f9fa] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-sm tracking-widest font-semibold text-black/40">Trusted by teams</h2>
      </div>
      
      <div 
        className="w-full flex relative pb-8"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div className="flex animate-marquee-infinite whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex-shrink-0 mx-4 md:mx-6 h-[40px] md:h-12 w-24 md:w-32 relative flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="Partner Logo" className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
