<!--
SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
SPDX-License-Identifier: GPL-3.0-or-later
-->

# `BackgroundVideo`

## `react-player`

Uses the [`react-player` library][react-player-repo]
to embed and configure a Vimeo embed for background autoplay on render.
While this library isn't strictly "necessary", it saves us some boilerplate.
It's also useful for [many other media sources][react-player-supported-media],
including streams and static files.

### Support for React 18+ / Next.js 12+ / SSR

Server-side-rendered (SSR) React components (one of the smart things Next.js
does in the background) can cause issues in libraries that haven't yet adjusted
to the additional nuances and complexities associated with emerging React features.

`react-player` is included in this bucket -- and unfortunately, some folks in
the issue tracker think that "just disable React Strict Mode" is a solution.

Fortunately, we can navigate around the issues in a couple different ways, both
of which may also be generally applicable to other libraries with SSR issues.

#### Method 1: Ensure the `window` object is available before rendering

In a component:

```tsx
const [hasWindow, setHasWindow] = useState(false)

useEffect(() => {
  if (typeof window !== 'undefined') {
    setHasWindow(true)
  }
}, [])

return hasWindow
  ? {
      /* ... */
    }
  : null
```

Source: <https://github.com/hashicorp/react-components/blob/d1b587e13f2a7f01e271b3cc0c0d495b26377a2f/packages/inline-video/index.tsx#LL24-L30C9>

#### Method 2: Next.js: Dynamic Imports with `ssr: false`

<https://nextjs.org/docs/advanced-features/dynamic-import>

TKTKTK

[react-player-repo]: https://github.com/CookPete/react-player
[react-player-supported-media]: https://github.com/CookPete/react-player#supported-media

## Browser/Platform Support

Autoplaying background videos can be difficult to work with,
especially on mobile devices.

You will never see consistent behavior across all common platforms and browsers.
This is not something we can resolve entirely -- it's up to each platform and
browser to decide. They control the possibilities and limitations of our available workarounds.
But don't hold it against them -- their rationales for hampering automatic video playback
are usually guided by a concern for acceptable user experience.

Take a look at the [issue tracker for `react-player`][react-player-issues]
to get a taste of the rabbit hole (though, as to be expected from a popular library,
most of the open issues are support requests in disguise).

[react-player-issues]: https://github.com/cookpete/react-player/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc

## Video Processing with `ffmpeg`

We had an input stock video of 13 seconds, but wanted it to be twice as long.
`ffmpeg` was the natural choice for this operation.

> ffmpeg has been described as the Swiss army knife of multimedia. It incorporates hundreds of video, audio, and image decoders and encoders, muxers and demuxers, filters and devices. It provides a CLI and a set of libraries for working with its tools, and is the core component of many video and audio players as a result ... If you want to do almost anything with multimedia files — re-encode them, re-mux them, live stream it, whatever — ffmpeg can handle it with ease.

> ffmpeg is notable for being one of the first large-scale FOSS projects to completely eradicate proprietary software in its niche. Virtually all multimedia-related companies rely on ffmpeg to do their heavy lifting. It took a complex problem and solved it, with free software. The book is now closed on multimedia: ffmpeg is the solution to almost all of your problems. And if it’s not, you’re more likely to patch ffmpeg than to develop something new. The code is accessible and the community are experts in your problem domain.
>
> ffmpeg is one of the foremost pillars of achievement in free software. It has touched the lives of every reader, whether they know it or not. If you’ve ever watched TV, or gone to a movie, or watched videos online, or listened to a podcast, odds are that ffmpeg was involved in making it possible. It is one of the most well-executed and important software projects of all time.

— Drew DeVault, [In praise of ffmpeg][devault-blog-post] (2022)

How does one get more from less? Where does the extra duration come from?
"Slowing down" a video means we need to duplicate the existing frames
to fill out the desired duration.

But that results in an unfortunate problem: now the video is no longer "smooth".
Each "frame" looks to the viewer as if it's been stretched out for a longer duration,
resulting in a jagged, stuttered appearance resembling a low frame-rate GIF.
Even though the actual frame rate hasn't technically changed,
to the viewer it appears that it's been _reduced_ by 400%.
That is, given an input frame rate of ~30fps (29.97 to be exact),
we end up with an _apparent_ frame rate of 7.5fps. Which is absolutely terrible
That's not going to work for the purpose of a background video
featured at the top of the site's landing page.

So then what? [Motion interpolation][wikipedia-motion-interpolation] to the
rescue! From Wikipedia:

> **Motion interpolation** or **motion-compensated frame interpolation**
> (**MCFI**) is a form of [video
> processing](https://en.wikipedia.org/wiki/Video_processing 'Video processing')
> in which intermediate animation frames are generated between existing ones by
> means of [interpolation](https://en.wikipedia.org/wiki/Interpolation 'Interpolation'), in an attempt to make animation more fluid, to compensate
> for [display motion blur](https://en.wikipedia.org/wiki/Display_motion_blur 'Display motion blur'), and for fake [slow
> motion](https://en.wikipedia.org/wiki/Slow_motion 'Slow motion') effects.

Specifically, we can use `ffmpeg`'s [`minterpolate` filter][ffmpeg-minterpolate].

The command:

```console
$ ffmpeg -i <input-file> -filter:v "setpts=2.0*PTS,minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'" -threads 4 <output-filename>.mkv
```

<details>
<summary>Output Log (Edited for clarity)</summary>

```console
$ ffmpeg -i input.mov -filter:v "setpts=2.0*PTS,minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'" -threads 4 output.mkv

ffmpeg version 4.4.2 Copyright (c) 2000-2021 the FFmpeg developers
built with clang version 11.1.0
configuration: --disable-static --prefix=/nix/store/gbvb5q24zqpcplpxigyxph457766avfh-ffmpeg-4.4.2 --arch=aarch64 --target_os=darwin --pkg-config=pkg-config --enable-gpl --enable-version3 --enable-shared --enable-pic --enable-libsrt --enable-runtime-cpudetect --enable-hardcoded-tables --enable-pthreads --disable-w32threads --disable-os2threads --enable-network --enable-pixelutils --enable-ffmpeg --disable-ffplay --enable-ffprobe --enable-avcodec --enable-avdevice --enable-avfilter --enable-avformat --enable-avresample --enable-avutil --enable-postproc --enable-swresample --enable-swscale --disable-doc --enable-libass --enable-bzlib --enable-gnutls --enable-fontconfig --enable-libfreetype --enable-libmp3lame --enable-iconv --enable-libtheora--enable-libssh --disable-vaapi --disable-libdrm --enable-vdpau --enable-libvorbis --enable-libvpx --enable-lzma --disable-opengl --disable-libmfx --disable-libaom --enable-sdl2 --enable-libsoxr --enable-libx264 --enable-libxvid --enable-libzimg --enable-zlib --enable-libopus --enable-libspeex --enable-libx265 --enable-libdav1d --disable-debug --enable-optimizations --disable-extra-warnings --disable-stripping --cc=clang
libavutil 56. 70.100 / 56. 70.100
libavcodec 58.134.100 / 58.134.100
libavformat 58. 76.100 / 58. 76.100
libavdevice 58. 13.100 / 58. 13.100
libavfilter 7.110.100 / 7.110.100
libavresample 4. 0. 0 / 4. 0. 0
libswscale 5. 9.100 / 5. 9.100
libswresample 3. 9.100 / 3. 9.100
libpostproc 55. 9.100 / 55. 9.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'input.mov':
Metadata:
major_brand : qt
minor_version : 0
compatible_brands: qt
creation_time : 2022-09-05T14:42:47.000000Z
com.apple.quicktime.keywords: 9-5-22,2022-09-04 Phila South Housing
com.apple.quicktime.description: This video is about 2022-09-04 Phila South Housing Clip 6
com.apple.quicktime.author: Nathan Wenger
com.apple.quicktime.displayname: 2022-09-04 Phila South Housing Clip 6
com.apple.quicktime.title: 2022-09-04 Phila South Housing Clip 6
Duration: 00:00:13.11, start: 0.000000, bitrate: 63195 kb/s
Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 3840x2160, 63052 kb/s, SAR 1:1 DAR 16:9, 29.97 fps, 29.97 tbr, 30k tbn, 60k tbc (default)
Metadata:
creation_time : 2022-09-05T14:42:47.000000Z
handler_name : Core Media Video
vendor_id : [0][0][0][0]
encoder : H.264
timecode : 00:00:00:00
Stream #0:1(und): Data: none (tmcd / 0x64636D74), 0 kb/s (default)
Metadata:
creation_time : 2022-09-05T14:42:47.000000Z
handler_name : Core Media Time Code
timecode : 00:00:00:00
File 'output.mkv' already exists. Overwrite? [y/N] y
Stream mapping:
Stream #0:0 -> #0:0 (h264 (native) -> h264 (libx264))
Press [q] to stop, [?] for help
[libx264 @ 0x12900a000] using SAR=1/1
[libx264 @ 0x12900a000] using cpu capabilities: ARMv8 NEON
[libx264 @ 0x12900a000] profile High, level 6.0, 4:2:0, 8-bit
[libx264 @ 0x12900a000] 264 - core 163 - H.264/MPEG-4 AVC codec - Copyleft 2003-2021 - http://www.videolan.org/x264.html - options: cabac=1 ref=3 deblock=1:0:0 analyse=0x3:0x113 me=hex subme=7 psy=1 psy_rd=1.00:0.00 mixed_ref=1 me_range=16 chroma_me=1 trellis=1 8x8dct=1 cqm=0 deadzone=21,11 fast_pskip=1 chroma_qp_offset=-2 threads=4 lookahead_threads=1 sliced_threads=0 nr=0 decimate=1 interlaced=0 bluray_compat=0 constrained_intra=0 bframes=3 b_pyramid=2 b_adapt=1 b_bias=0 direct=1 weightb=1 open_gop=0 weightp=2 keyint=250 keyint_min=25 scenecut=40 intra_refresh=0 rc_lookahead=40 rc=crf mbtree=1 crf=23.0 qcomp=0.60 qpmin=0 qpmax=69 qpstep=4 ip_ratio=1.40 aq=1:1.00
Output #0, matroska, to 'output.mkv':
Metadata:
major_brand : qt
minor_version : 0
compatible_brands: qt
com.apple.quicktime.title: 2022-09-04 Phila South Housing Clip 6
com.apple.quicktime.keywords: 9-5-22,2022-09-04 Phila South Housing
com.apple.quicktime.description: This video is about 2022-09-04 Phila South Housing Clip 6
com.apple.quicktime.author: Nathan Wenger
com.apple.quicktime.displayname: 2022-09-04 Phila South Housing Clip 6
encoder : Lavf58.76.100
Stream #0:0(und): Video: h264 (H264 / 0x34363248), yuv420p(tv, bt709, progressive), 3840x2160 [SAR 1:1 DAR 16:9], q=2-31, 120 fps, 1k tbn (default)
Metadata:
creation_time : 2022-09-05T14:42:47.000000Z
handler_name : Core Media Video
vendor_id : [0][0][0][0]
timecode : 00:00:00:00
encoder : Lavc58.134.100 libx264
Side data:
cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
frame= 3132 fps=1.6 q=-1.0 Lsize= 75980kB time=00:00:26.07 bitrate=23869.9kbits/s speed=0.0134x
video:75956kB audio:0kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.032733%
[libx264 @ 0x12900a000] frame I:13 Avg QP:23.99 size:799058
[libx264 @ 0x12900a000] frame P:1888 Avg QP:27.16 size: 31532
[libx264 @ 0x12900a000] frame B:1231 Avg QP:33.40 size: 6383
[libx264 @ 0x12900a000] consecutive B-frames: 44.9% 7.0% 3.7% 44.4%
[libx264 @ 0x12900a000] mb I I16..4: 4.1% 59.6% 36.3%
[libx264 @ 0x12900a000] mb P I16..4: 0.0% 0.0% 0.0% P16..4: 22.0% 3.5% 3.2% 0.0% 0.0% skip:71.3%
[libx264 @ 0x12900a000] mb B I16..4: 0.0% 0.0% 0.0% B16..8: 31.7% 0.0% 0.0% direct: 0.0% skip:68.2% L0:43.1% L1:56.4% BI: 0.5%
[libx264 @ 0x12900a000] 8x8 transform intra:57.5% inter:77.8%
[libx264 @ 0x12900a000] coded y,uvDC,uvAC intra: 81.3% 72.4% 27.8% inter: 4.1% 5.3% 0.0%
[libx264 @ 0x12900a000] i16 v,h,dc,p: 59% 16% 9% 17%
[libx264 @ 0x12900a000] i8 v,h,dc,ddl,ddr,vr,hd,vl,hu: 27% 27% 13% 4% 5% 5% 6% 5% 8%
[libx264 @ 0x12900a000] i4 v,h,dc,ddl,ddr,vr,hd,vl,hu: 26% 33% 7% 4% 6% 5% 7% 5% 7%
[libx264 @ 0x12900a000] i8c dc,h,v,p: 37% 25% 28% 9%
[libx264 @ 0x12900a000] Weighted P-Frames: Y:0.0% UV:0.0%
[libx264 @ 0x12900a000] ref P L0: 65.3% 17.0% 10.2% 7.5%
[libx264 @ 0x12900a000] ref B L0: 95.5% 4.0% 0.4%
[libx264 @ 0x12900a000] ref B L1: 96.9% 3.1%
[libx264 @ 0x12900a000] kb/s:23839.95
```

</details>

[wikipedia-motion-interpolation]: https://en.wikipedia.org/wiki/Motion_interpolation
[devault-blog-post]: https://drewdevault.com/2022/10/12/In-praise-of-ffmpeg.html
[ffmpeg-minterpolate]: https://ffmpeg.org/ffmpeg-all.html#minterpolate

### References

- Capture a single frame from a video and output as an image file (see the `video-thumb-capture` task in `$PRJ_ROOT/Justfile`)
- Slow down a video, using motion interpolation to smooth over the effect of

- [How to speed up / slow down a video – FFmpeg](https://trac.ffmpeg.org/wiki/How%20to%20speed%20up%20/%20slow%20down%20a%20video)
- [FFmpeg - Ultimate Guide | IMG.LY Blog](https://img.ly/blog/ultimate-guide-to-ffmpeg/) -- nice extended explainer
- [leandromoreira/ffmpeg-libav-tutorial](https://github.com/leandromoreira/ffmpeg-libav-tutorial) -- "FFmpeg libav tutorial - learn how media works from basic to transmuxing, transcoding and more."
- [(mis)Using FFmpeg’s Motion Interpolation Options | Antonio Roberts](https://www.hellocatfood.com/misusing-ffmpegs-motion-interpolation-options/) -- blog post describing one person's creative application of the `minterpolate` filter
- [FFmpeg Encoding and Editing Course](https://slhck.info/ffmpeg-encoding-course/#/) -- presentation slide deck
- [ffmpeg guide](https://gist.github.com/protrolium/e0dbd4bb0f1a396fcb55) --
  `ffmpeg` cheatsheet for some basic use cases
