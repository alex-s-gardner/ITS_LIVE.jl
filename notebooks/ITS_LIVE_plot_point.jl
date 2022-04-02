### A Pluto.jl notebook ###
# v0.17.7

using Markdown
using InteractiveUtils

# This Pluto notebook uses @bind for interactivity. When running this notebook outside of Pluto, the following 'mock version' of @bind gives bound variables a default value (instead of an error).
macro bind(def, element)
    quote
        local iv = try Base.loaded_modules[Base.PkgId(Base.UUID("6e696c72-6542-2067-7265-42206c756150"), "AbstractPlutoDingetjes")].Bonds.initial_value catch; b -> missing; end
        local el = $(esc(element))
        global $(esc(def)) = Core.applicable(Base.get, el) ? Base.get(el) : iv(el)
        el
    end
end

# ╔═╡ 627497e5-c27a-47c5-b9cd-da8da0c4c9e6
import Pkg; Pkg.add(Pkg.PackageSpec(path="/Users/gardnera/Documents/GitHub/ItsLive.jl")); Pkg.add("PlutoUI"); Pkg.add("Plots")

# ╔═╡ 650d51da-3a14-4f8d-9631-abfc14acee08
## Import packages [this can take minutes, be patient]
using PlutoUI, Plots

# ╔═╡ 223463aa-377f-44ce-9158-c6abb4c6c436
md"""
##### ITS_LIVE: interactive glacier velocity time series notebook

A simple Pluto notebook showing how to use the basic functionality of the ITS\_LIVE.jl package. E.g. how to access and plot ITS_LIVE timeseries of glacier velocities for single lat/lon location.
"""

# ╔═╡ 48efca4a-5fa3-4247-bf31-9101b53071e5
import ItsLive

# ╔═╡ 0171f217-df19-44dd-82b3-622126d332ac
Plots.PlotlyBackend()

# ╔═╡ ec7b89e9-91f3-4d66-9dbb-790f9a6b9a7f
## Load ITS_LIVE datacube catalog [~5s]
catalogdf = ItsLive.catalog();

# ╔═╡ 36347994-417d-4f86-8463-61595db3dbc2
begin
	latin = @bind lat NumberField(-90:0.0001:90, default=60.0480)
	lonin = @bind lon NumberField(-180:0.0001:180, default=-140.5153)
	varin = @bind var Select(["v", "v_error"])
	dtmaxin = @bind maxdt NumberField(10:20:510, default=510)
	
	md"""
	**Input location and variable of interest [default = Malispina]:**
	
	Latitude: $(latin) [decimal degrees]
	
	Longitude: $(lonin) [decimal degrees]

	Variable: $(varin)

	max dt: $(dtmaxin) [maximum image-pair time separation, dt]
	"""
end

# ╔═╡ 9c87e266-8745-4108-a355-7f139acf6c57
## Retrieve data from datacube sitting in the AWS cloud
C = ItsLive.getvar(lat,lon,["mid_date", "date_dt", "satellite_img1", var], catalogdf)

# ╔═╡ b4e0d407-d94c-46c1-a873-59dd1d92ef14
## Plot data
p = ItsLive.plotbysensor(C, var; dtmax = maxdt); plot(p)

# ╔═╡ Cell order:
# ╟─223463aa-377f-44ce-9158-c6abb4c6c436
# ╠═627497e5-c27a-47c5-b9cd-da8da0c4c9e6
# ╠═650d51da-3a14-4f8d-9631-abfc14acee08
# ╠═48efca4a-5fa3-4247-bf31-9101b53071e5
# ╠═0171f217-df19-44dd-82b3-622126d332ac
# ╠═ec7b89e9-91f3-4d66-9dbb-790f9a6b9a7f
# ╟─36347994-417d-4f86-8463-61595db3dbc2
# ╠═9c87e266-8745-4108-a355-7f139acf6c57
# ╠═b4e0d407-d94c-46c1-a873-59dd1d92ef14
