import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Trophy,
  ShieldCheck,
  Briefcase,
  School,
  HeartHandshake,
  Github,
  LinkedinIcon,
  FileText,
} from "lucide-react";
import { TbCopy, TbCopyCheck} from "react-icons/tb";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import Experience from "@/components/Experiences";
import Approach from "@/components/Approach";
import MagicButton from "@/components/ui/magicButton";
import animationData from "@/pages/confetti.json";

const aboutStats = [
  { label: "Expected graduation year", value: "2026" },
  { label: "Predicted grade", value: "1st" },
  { label: "Companies worked with", value: "2+" },
];

const projects = [
  {
    title: "FPGA-Mario",
    description: "Real time race system powered by low-level hardware integration",
    image: "/assets/fpgakartv2.webp",
    href: "https://github.com/SamuelKhoo2003/FPGA-Mario",
  },
  {
    title: "Fanta-C Compiler",
    description: "High performance C-Compiler",
    image: "/assets/fantac.webp",
    href: "https://github.com/SamuelKhoo2003/Fanta-C-Compiler",
  },
  {
    title: "Smart Grid",
    description: "Energy trading simulation and solar grid management",
    image: "/assets/smartgrid.webp",
    href: "https://github.com/SamuelKhoo2003/SmartGrid",
  },
  {
    title: "Journify",
    description: "A modern take at journalling",
    image: "/assets/journify.webp",
    href: "https://github.com/SamuelKhoo2003/Journify",
  },
  {
    title: "Chatform",
    description: "Fully deployed social platform",
    image: "/assets/chatform.jpeg",
    href: "http://samuelkhoo.pythonanywhere.com/",
  },
  {
    title: "Market Playground",
    description: "Collection of trading & quantitative solutions",
    image: "/assets/marketplaygroundv2.webp",
    href: "https://github.com/SamuelKhoo2003/Market-Playground",
  },
  {
    title: "Mini-Arcade",
    description: "Collection of mini games",
    image: "/assets/miniarcadev3.webp",
    href: "https://github.com/SamuelKhoo2003/Mini-Arcade",
  },
];

const extras = [
  {
    title: "Awards",
    description:
      "Optiver IC-Hack Trading Challenge Winner - 2023\n Gold UKMT Senior Maths Challenge 2021-2022",
    icon: Trophy,
  },
  {
    title: "Certifications",
    description:
      "Imperial College Algorithmic Trading Course - 2022\n Harvard CS50x & Helsinki University MOOC - 2022",
    icon: ShieldCheck,
  },
  {
    title: "Springs & Work Shadowing",
    description:
      "JP-Morgan Technology Virtual Program - 2023\n ACCESSIA Work Shadowing Program - 2022",
    icon: Briefcase,
  },
  {
    title: "Teaching",
    description:
      "Imperial College Programming UTA - 2022-2024\n Private Tutor (CS & Maths) - 2022-2024",
    icon: School,
  },
  {
    title: "Volunteering",
    description:
      "Imperial College Malaysian Society (External Liasion Officer) - 2022-2023",
    icon: HeartHandshake,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // const copyAnimationOptions = {
  //   loop: copied,
  //   autoplay: copied,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  const handleCopy = async () => {
    const text = "samuel.khoo22@imperial.ac.uk"

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch (error) {
      console.error("Copy failed", error)
      setCopied(false)
    }
  };

  // listener for the copy (not fully functional)
  // useEffect(() => {
  //   const handleClipboardCopy = (e: ClipboardEvent) => {
  //     const clipboardText = e.clipboardData?.getData('text');
  //     if (clipboardText && clipboardText !== "samuel.khoo22@imperial.ac.uk") {
  //       setCopied(false);
  //     }
  //   };
  //   // Add a listener to handle when any text is copied
  //   document.addEventListener('copy', handleClipboardCopy);

  //   // Cleanup listener when the component is unmounted
  //   return () => {
  //     document.removeEventListener('copy', handleClipboardCopy);
  //   };
  // }, []);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>python</span>
              <span className={styles.pill}>c++</span>
              <span className={styles.pill}>react</span>
              <span className={styles.pill}>aws</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Samuel.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                A computer engineering student at Imperial College London and aspiring software engineer interested in technology, design and finance.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:samuel.khoo22@imperial.ac.uk" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
              {/* Circular GitHub and LinkedIn buttons */}
              <div className="flex space-x-1.5">
                <a
                  href="https://github.com/SamuelKhoo2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-700"
                >
                  <Github className="w-5 h-5" /> {/* Github icon from lucide-react */}
                </a>
                <a
                  href="https://www.linkedin.com/in/samuel-khoo-b21ab1253/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-500"
                >
                  <LinkedinIcon className="w-5 h-5" /> {/* LinkedIn icon from lucide-react */}
                </a>
                <a
                  href="/assets/samuelcv.pdf" // Replace with your actual CV file path
                  download="SamuelKhoo_CV.pdf" // The file name for the downloaded file
                  className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-500"
                >
                  <FileText className="w-5 h-5" /> {/* File-Text icon */}
                </a>
              </div>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              {/* I want to add a different spline but I need a premium spline account to remove watermark */}
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16 pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[35px]">
                I&apos;m a 3rd year Computer Engineering student based in London.
                My interests span in both software and hardware with experience in full-stack development at both
                startups and mid-sized companies. My skillset consists of <u>Python</u> & <u>C++</u> alongside <u>React</u>, <u>JavaScript</u>, <u>TypeScript</u>,
                and cloud technologies like <u>AWS</u>. I&apos;ve been involved in various stages of product development from initial design to final delivery. I&apos;m passionate
                about learning new technologies and thrive in adapting to different challenges. I enjoy collaborating with cross-functional teams to create 
                effective, cutting-edge solutions.
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Innovative technical solutions.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from web-apps to fully functional systems. Here are some of my favorites:
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank" passHref>
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            )}
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Experiences */}
        <section id="experiences" data-scroll-section>
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
            📁 Experiences
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Shaping outcomes through practical work.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve collaborated with a diverse set of companies, honing my ability to thrive in dynamic and fast-paced environments.
            </p>
            <Experience />
          </div>
        </section>

           {/* Work Approach */}
           <section id="experiences" data-scroll-section>
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
            ⚡Work Approach
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              An adaptive work philosophy.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve developed a versatile approach that adapts seamlessly to a range of evolving environments, with the core focus of delivery impactful results.
            </p>
            <Approach />
          </div>
        </section>

        {/* Extras */}
        <section id="extras" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need more info?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are a few extras about me, including some of my achievements and activities.
                  If you have any questions, feel free to reach out
                </p>
              </div>
              {extras.map((extra) => (
                <div
                  key={extra.title}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <extra.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {extra.title}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {extra.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently available for 6-month placements or summer internships in 2025, in both software and hardware.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-4">
              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={copied ? <TbCopyCheck /> : <TbCopy />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
