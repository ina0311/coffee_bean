import { useEffect, useRef, useState } from 'react'
import { Box, Typography, Alert } from '@mui/material'
import * as d3 from 'd3'
import useFlavor from '../hooks/useFlavor'
import { Flavor } from '@coffee-bean/types'

interface HierarchyDatum {
  name: string
  children?: HierarchyDatum[]
  value?: number
  color?: string
  id?: number
}

export const CoffeeFlavorWheel = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { flavors } = useFlavor()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!svgRef.current || !flavors) {
      console.log('初期条件チェック:', { svgRef: !!svgRef.current, flavors: !!flavors })
      return
    }

    try {
      console.log('受け取ったflavorsデータ:', flavors)

      const width = 800
      const height = 800
      const radius = Math.min(width, height) / 2

      // Clear previous content and error
      d3.select(svgRef.current).selectAll('*').remove()
      setError(null)

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)

      console.log('SVG要素の確認:', {
        width: svg.attr('width'),
        height: svg.attr('height'),
        viewBox: svg.attr('viewBox'),
        transform: svg.attr('transform')
      })

      // データを階層構造に変換
      const transformData = (flavors: Flavor[]): HierarchyDatum => {
        interface ExtendedHierarchyDatum extends HierarchyDatum {
          id?: number
        }

        const root: HierarchyDatum = { name: 'root', children: [] }
        const categories: { [key: number]: ExtendedHierarchyDatum } = {}
        const subCategories: { [key: number]: ExtendedHierarchyDatum } = {}
        
        // 最上位の親要素を先に作成（idでソート）
        const parentFlavors = flavors.filter(f => !f.parentId).sort((a, b) => a.id - b.id)
        console.log('親フレーバー:', parentFlavors)

        parentFlavors.forEach(flavor => {
          console.log('親フレーバーを処理中:', flavor)
          categories[flavor.id] = { 
            name: flavor.name, 
            children: [],
            color: flavor.color,
            id: flavor.id  // idを保持
          }
          root.children?.push(categories[flavor.id])
        })
        
        // 中間層（第2階層）を作成（idでソート）
        const middleFlavors = flavors
          .filter(f => f.parentId && categories[f.parentId])
          .sort((a, b) => a.id - b.id)

        middleFlavors.forEach(flavor => {
          console.log('中間層フレーバーを処理中:', flavor)
          subCategories[flavor.id] = {
            name: flavor.name,
            children: [],
            color: flavor.color,
            id: flavor.id  // idを保持
          }
          categories[flavor.parentId!].children?.push(subCategories[flavor.id])
        })

        // 最下層（第3階層）を追加（idでソート）
        const leafFlavors = flavors
          .filter(f => f.parentId && subCategories[f.parentId])
          .sort((a, b) => a.id - b.id)

        leafFlavors.forEach(flavor => {
          console.log('最下層フレーバーを処理中:', flavor)
          subCategories[flavor.parentId!].children?.push({
            name: flavor.name,
            color: flavor.color,
            id: flavor.id  // idを保持
          })
        })

        // 各階層の子要素をidでソート
        const sortByIdIfExists = (a: ExtendedHierarchyDatum, b: ExtendedHierarchyDatum) => {
          const aId = a.id || 0
          const bId = b.id || 0
          return aId - bId
        }

        // 各階層をソート
        root.children?.sort(sortByIdIfExists)
        root.children?.forEach(category => {
          category.children?.sort(sortByIdIfExists)
          category.children?.forEach(subCategory => {
            subCategory.children?.sort(sortByIdIfExists)
          })
        })

        console.log('最終的な階層構造:', JSON.stringify(root, null, 2))
        return root
      }

      const transformedData = transformData(flavors)
      console.log('変換後のデータ構造:', {
        name: transformedData.name,
        childrenCount: transformedData.children?.length,
        firstChild: transformedData.children?.[0]
      })
      
      const partition = d3.partition<HierarchyDatum>()
        .size([2 * Math.PI, 1])

      const hierarchyData = d3.hierarchy(transformedData)
        .sum(() => 1)
        .sort(() => 0)  // ソートをスキップ

      console.log('階層データの確認:', {
        height: hierarchyData.height,
        depth: hierarchyData.depth,
        value: hierarchyData.value,
        childrenCount: hierarchyData.children?.length
      })

      const root = partition(hierarchyData)
      console.log('パーティションデータの確認:', {
        x0: root.x0,
        x1: root.x1,
        y0: root.y0,
        y1: root.y1,
        depth: root.depth,
        height: root.height,
        firstChild: root.children?.[0]
      })

      // 円の描画
      const arc = d3.arc<d3.HierarchyRectangularNode<HierarchyDatum>>()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(0.01)
        .padRadius(radius)
        .innerRadius(d => Math.sqrt(d.y0) * radius)
        .outerRadius(d => Math.sqrt(d.y1) * radius)

      // パスの描画とホバーエフェクト
      const paths = svg.selectAll('path')
        .data(root.descendants().filter(d => d.depth))
        .join('path')

      console.log('パスの生成前の確認:', {
        pathsCount: paths.size(),
        dataCount: root.descendants().filter(d => d.depth).length,
        firstPathData: root.descendants().filter(d => d.depth)[0]
      })

      paths
        .attr('fill', d => d.data.color || '#5D4037')
        .attr('d', arc)
        .style('stroke', '#FFFFFF')
        .style('stroke-width', '2')
        .style('transition', 'opacity 0.3s')

      console.log('Number of paths created:', paths.size())

      paths
        .on('mouseover', function() {
          d3.select(this)
            .style('opacity', 0.8)
            .style('cursor', 'pointer')
        })
        .on('mouseout', function() {
          d3.select(this)
            .style('opacity', 1)
        })
        .on('click', function(event, d) {
          console.log('クリックされたフレーバー:', d.data.name)
          d3.select(this)
            .style('stroke', '#000')
            .style('stroke-width', '2')
        })
        .append('title')
        .text(d => d.data.name)

      // テキストの描画
      const texts = svg.selectAll('text')
        .data(root.descendants().filter(d => d.depth))
        .join('text')
        .attr('transform', d => {
          const x = (d.x0 + d.x1) / 2 * 180 / Math.PI
          // 階層に応じて半径を調整
          const y = Math.sqrt((d.y0 + d.y1) / 2) * radius * (d.depth === 1 ? 0.85 : 0.95)
          return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
        })
        .attr('dy', '0.35em')
        .attr('font-size', d => {
          // フォントサイズを階層に応じて調整
          if (d.depth === 1) return '16px'
          if (d.depth === 2) return '14px'
          return '12px'
        })
        .attr('font-weight', d => d.depth === 1 ? 'bold' : 'normal')
        .attr('fill', d => {
          const color = d.data.color || '#5D4037'
          const rgb = d3.rgb(color)
          const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
          return brightness > 128 ? '#000000' : '#FFFFFF'
        })
        .style('text-anchor', 'middle')
        .style('text-shadow', d => {
          // 背景色に応じてテキストシャドウを調整
          const color = d.data.color || '#5D4037'
          const rgb = d3.rgb(color)
          const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
          return brightness > 128 
            ? '0px 0px 3px rgba(255,255,255,0.8), 0px 0px 1px rgba(0,0,0,0.6)'
            : '0px 0px 3px rgba(0,0,0,0.8), 0px 0px 1px rgba(255,255,255,0.6)'
        })
        .text(d => {
          // テキストの長さに応じて改行を追加
          const name = d.data.name
          if (name.length > 12 && d.depth > 1) {
            const mid = Math.ceil(name.length / 2)
            return `${name.slice(0, mid)}\n${name.slice(mid)}`
          }
          return name
        })
        .each(function() {
          // 改行のある場合はtspanを使用
          const text = d3.select(this)
          const lines = text.text().split('\n')
          if (lines.length > 1) {
            text.text(null)
            lines.forEach((line, i) => {
              text.append('tspan')
                .attr('x', 0)
                .attr('dy', i === 0 ? '0em' : '1em')
                .text(line)
            })
          }
        })
        .style('pointer-events', 'none')

      console.log('Number of texts created:', texts.size())

    } catch (err) {
      console.error('Error creating flavor wheel:', err)
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました')
    }
  }, [flavors])

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" align="center" gutterBottom>
        コーヒーフレーバーホイール
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      <Box sx={{ width: '800px', height: '800px' }}>
        <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Box>
  )
}